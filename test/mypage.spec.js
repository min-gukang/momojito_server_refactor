const request = require('supertest');
const should = require('should');
const path = require('path');
const { expect } = require('chai');
const app = require('../app');
const { sequelize } = require('../models/index');
//should사용?

describe('mypage 기능 테스트', () => {
  //회원가입
  it('회원가입이 진행되어야 합니다', (done) => {
    request(app)
      .post('/auth/signup')
      .send({
        email: 'test1@naver.com',
        password: '123123',
      })
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });

  //로그인 상태 유지를 위해..
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post('/auth/signin')
      .send({
        email: 'test1@naver.com',
        password: '123123',
      })
      .end(done);
  });

  describe('POST/ 닉네임변경', () => {
    it('성공시 닉네임을 수정할 수 있어야 합니다', (done) => {
      agent
        .patch('/mypage/nickname')
        .send({
          nickname: 'nickChange',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('닉네임 수정 완료');
          done();
        });
    });
    //한명더 회원가입
    before('회원가입이 진행되어야 합니다', (done) => {
      request(app)
        .post('/auth/signup')
        .send({
          email: 'test2@naver.com',
          password: '123123',
          nickname: 'doubleCheck',
        })
        .end(done);
    });

    it('닉네임 변경 실패시 400을 반환해야 합니다.', (done) => {
      agent
        .patch('/mypage/nickname')
        .send({
          nickname: 'doubleCheck',
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('이미 존재하는 닉네임입니다');
          done();
        });
    });
  });
  describe('POST/ 비번 변경', () => {
    it('성공시 비번을 수정할 수 있어야 합니다', (done) => {
      agent
        .patch('/mypage/password')
        .send({
          password: '123123',
          newPassword: '789789',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.status).to.equal(200);
          expect(res.text).to.equal('비밀번호 수정 완료');
          done();
        });
    });
  });
  describe('POST/ 프로필변경', () => {
    it('성공시 프로필을 수정할 수 있어야 합니다', (done) => {
      agent
        .post('/mypage/profile')
        .field('Content-type', 'multipart/form-data')
        .attach('image', path.join(__dirname, '../javascriptLogo.png'))
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.status).to.equal(200);
          expect(res.text).to.equal('프로필 수정 완료');
          done();
        });
    });
  });

  // before(async () => {
  //   for (let i = 0; i < 20; i++) {
  //     await Cocktail.create({
  //       name: 'dummy',
  //       koName: 'dummy',
  //     });
  //   }
  // });

  describe('GET 내 칵테일 불러오기', () => {
    it('성공시 칵테일 리스트를 배열의 형태로 가져와야 합니다', (done) => {
      agent
        .get('/mypage/myCocktails')
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            done(err);
            return;
          }
          console.log('res', res.body.list);
          res.body.list.should.be.instanceOf(Array);
          done();
        });
    });
  });

  describe('GET / userInfo', () => {
    it('성공시 유저정보를 가져와야 합니다', (done) => {
      agent
        .get('/mypage/userInfo')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          console.log('res.userinfo', Object.keys(res.body.userInfo));
          res.body.userInfo.should.have.properties(
            'email',
            'nickname',
            'snsId'
          );
          res.body.message.should.be.equal('유저 정보를 불러왔습니다');
          done();
        });
    });
  });

  after(() => {
    console.log('=============디비 초기화=============');
    sequelize.sync({ force: true });
    //테스트하고 마지막에 서버가 꺼지게 하고 싶다.
    //db session테이블 test계정들 없애기. req.session.destroy하면 되지 않을까?
  });
});
