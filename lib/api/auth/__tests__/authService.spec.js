const { expect } = require('chai');
const { spy, assert } = require('sinon');
const { signUp, getToken, sinonable } = require('../authService');

describe('authService', () => {
  const username = `user${Date.now()}`;
  describe('signUp', () => {
    it('returns created user', async () => {
      const createUserSpy = spy(sinonable.UserDAL, 'createUser');
      const hashPasswordSpy = spy(sinonable.authUtils, 'hashPassword');
      const avatarUrl = 'http://i.pravatar.cc/200';
      const userData = {
        password: '12345678',
        username,
        avatarUrl
      };
      const user = await signUp(userData);

      createUserSpy.restore();
      hashPasswordSpy.restore();

      assert.calledOnce(createUserSpy);
      assert.calledOnce(hashPasswordSpy);
      expect(user).to.not.equal(null);
      expect(user).to.contain.keys('id', 'username', 'avatarUrl');
      expect(user.username).to.be.equal(user.username);
      expect(user.avatarUrl).to.be.equal(user.avatarUrl);
    });
  });

  describe('getToken', () => {
    it('returns token', async () => {
      const findUserSpy = spy(sinonable.UserDAL, 'findByUsername');
      const isPasswordValidSpy = spy(sinonable.authUtils, 'isPasswordValid');
      const createTokenSpy = spy(sinonable.authUtils, 'createToken');

      const userData = {
        password: '12345678',
        username
      };
      const token = await getToken(userData);

      findUserSpy.restore();
      isPasswordValidSpy.restore();
      createTokenSpy.restore();

      assert.calledOnce(findUserSpy);
      assert.calledOnce(isPasswordValidSpy);
      assert.calledOnce(createTokenSpy);
      expect(token).to.not.equal(null);
    });
  });
});
