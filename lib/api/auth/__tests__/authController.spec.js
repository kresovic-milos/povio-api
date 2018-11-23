const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

describe('authController', () => {
  const username = `user${Date.now()}`;
  describe('signUp', () => {
    const makeRequest = data => {
      const req = request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      return data ? req.send(data) : req;
    };

    it('responds with 201 and returns created user', () =>
      makeRequest({
        username,
        password: '12345678',
        avatarUrl: 'http://i.pravatar.cc/200'
      })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('user');
          expect(res.body.data.user).to.contain.keys('id', 'username', 'avatarUrl');
          expect(res.body.data.user.username).to.be.equals(username);
          expect(res.body.data.user).to.have.property('id');
        }));
  });

  describe('logIn', () => {
    const makeRequest = data => {
      const req = request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      return data ? req.send(data) : req;
    };

    it('responds with 200 and returns token', () =>
      makeRequest({
        username,
        password: '12345678'
      })
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).not.to.be.equal(null);
        }));
  });
});
