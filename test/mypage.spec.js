const request = require('supertest');
const app = require('../app');
const {expect} = require('chai');
//should사용? 

describe('mypage 기능', () => {
    const agent = request.agent(app);
    //회원가입 
    before((done) => {
        request(app)
            .post('auth/signup')
            .send({email: 'test2@naver.com', password: '123123'})
            .end(done)
    })

    //로그인 진행 및 유지 
    beforeEach((done) => {
        agent
            .post('/auth/signin')
            .send({
                email: 'test2@naver.com',
                password: '123123',
            })
            .end(done)
    })

    it('닉네임을 수정할 수 있어야 합니다', () => {
        agent
            .patch('/mypage/nickname')
            .send({
                email: 'test2@naver.com',
                password: '123123', 
            })
            .expect(200)
            .end((err, res) => {
                if(err) {
                    done(err);
                    return;
                }
                expect(res.text).to.equal('닉네임 수정 완료');
                done();
            })
    })

    it('비번을 수정할 수 있어야 합니다', () => {
        agent
            .patch('/mypage/password')
            .send({
                password: '123123',
                newPassword: '789789'
            })
            .expect(200)
            .end((err, res) => {
                if(err) {
                    done(err);
                    return;
                }
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('비밀번호 수정 완료');
            })

    })

    it('프로필을 수정할 수 있어야 합니다', () => {
        agent
            .patch('/mypage/profile')
            .expect(200)
            .end((err, res) => {
                if(err) {
                    done(err);
                    return;
                }
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('프로필 수정 완료');
            })

    })
})