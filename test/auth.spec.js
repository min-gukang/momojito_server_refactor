const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { expect } = require('chai');


describe('Auth 테스트 ', () => {
    it('회원가입이 진행되어야 합니다', (done) => {
      request(app)
        .post('/auth/signup')
        .send({
          email: 'test1@naver.com',
          password: '123123'
        })
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('유저 생성이 완료되었습니다');
          done();
        })
    });

    it('한번 가입한 아이디로 또 가입할 수 없습니다', (done) => {
      request(app)
        .post('/auth/signup')
        .send({
          email: 'test1@naver.com',
          password: '123123'
        })
        .expect(401)
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('이미 유저가 존재합니다');
          done();
        })
    });

    it('로그인이 진행되어야 합니다', (done) => {
      request(app)
        .post('/auth/signin')
        .send({
          email: 'test1@naver.com',
          password: '123123'
        })
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.body.message).to.equal('로그인 성공');
          done();
        })
    })

    //로그인 상태 만들기
    const agent = request.agent(app);
    beforeEach((done) => {
      agent
      .post('/auth/signin')
      .send({
        email: 'test1@naver.com',
        password: '123123'
      })
      .end(done)
    })

    it('로그아웃이 진행되어야 합니다', (done) => {
      agent
        .get('/auth/logout')
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('로그아웃 성공');
          done();
        })
    })

    it('회원탈퇴가 진행되어야 합니다', (done) => {
      agent
        .delete('/auth/withdraw')
        .send({
          email: 'test1@naver.com',
          password: '123123',
        })
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('계정삭제가 완료되었습니다');
          done();
        })
    })

    it('회원복구를 할 수 있어야 합니다', (done) => {
      request(app)
        .post('/auth/recovery')
        .expect(200)
        .send({
          email: 'test1@naver.com',
          password: '123123',
        })
        .end((err, res) => {
          if(err) {
            done(err);
            return;
          }
          expect(res.text).to.equal('계정 복구 완료');
          done();
        })
    })

    after(() => {
      console.log('=============디비 초기화=============')
      sequelize.sync({force: true, logging: false});
    })
});
