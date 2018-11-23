const request = require('supertest');
const app = require('../../../app');

describe('authAPI', () => {
  describe('POST /signup', () => {
    const makeRequest = data => {
      const req = request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      return data ? req.send(data) : req;
    };

    it('responds with 201 on success', done => {
      const username = `user${Date.now()}`;
      return makeRequest({
        username,
        password: '12345678',
        avatarUrl: 'http://i.pravatar.cc/200'
      }).expect(201, done());
    });

    it('responds with 400 on fail', done => makeRequest().expect(400, done()));
  });

  describe('POST /login', () => {
    const makeRequest = data => {
      const req = request(app).post('/api/auth/login');
      return data ? req.send(data) : req;
    };

    it('responds with 200 on success', done =>
      makeRequest({
        username: `test`,
        password: '12345678'
      }).expect(200, done()));

    it('responds with 400 on fail', done => makeRequest().expect(400, done()));
  });
});
