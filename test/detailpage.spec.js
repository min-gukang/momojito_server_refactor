const request = require('supertest');
const should = require('should');
const app = require('../app');
const { User, Cocktail } = require('../models');
const { sequelize } = require('../models');
const { expect } = require('chai');

before(async () => {
  sequelize.sync();

  let cocktailName = ['mojito', 'martini', 'magarita', 'cosmopolitan'];
  let koName = ['모히또', '마티니', '마가리타', '코스모폴리탄'];
  let rate = [0, 1, 2, 3];
  for (let i = 0; i < 4; i++) {
    await Cocktail.create({
      name: cocktailName[i],
      koName: koName[i],
      avrRate: 0,
    });
  }
});  

describe('detailPage 기능 테스트', () => {
  //회원가입 진행
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

  describe('PATCH / 내 칵테일 추가하기', () => {   
     //로그인 유지
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

    it('성공시', (done) => {
      agent
        .patch('/detailpage/favorite/2')
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            done(err);
            return;
          }
          //async를 사용하는데 done을 사용안하면 에러가 뜨는 이유?
          //should에서 never used 에러가 뜨는 이유??
          console.log('Favoirte : ', res.body.result);
          res.body.message.should.be.equal('칵테일이 추가되었습니다');
          done();
        });
    });
  });

  describe('PATCH / 평점주기', () => {
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
    it('성공시', () => {
      agent
        .patch('/detailpage/rate/5')
        .send({
          cocktailId: 2,
        })
        .expect(200)
        .end((err, res) => {
          res.text.should.be.equal('평점 반영 되었습니다');
        });
    });
  });
   // 일단 이거 넘어가자, after니까 이게 제일 마지막에 실행되야 하는데, 제로초꺼 참고해보자. 
   after(() => { 
    sequelize.sync({ force: true });
  });
});