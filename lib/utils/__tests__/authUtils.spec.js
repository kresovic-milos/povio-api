const { assert } = require('chai');
const authUtils = require('../authUtils');

describe('authUtils', () => {
  describe('isPasswordValid', () => {
    it('returns false if password is not same as hashed password', () => {
      const isValidPass = authUtils.isPasswordValid('pass123', 'wrong hash');
      assert.equal(isValidPass, false);
    });
  });

  describe('isAuthHeaderInvalid', () => {
    it('returns true if no header', () => {
      const isAuthHeaderInvalid = authUtils.isAuthHeaderInvalid();
      assert.equal(isAuthHeaderInvalid, true);
    });

    it('returns true if does not start with Bearer', () => {
      const isAuthHeaderInvalid = authUtils.isAuthHeaderInvalid('Bad header');
      assert.equal(isAuthHeaderInvalid, true);
    });

    it('returns false if starts with Bearer', () => {
      const isAuthHeaderInvalid = authUtils.isAuthHeaderInvalid('Bearer ');
      assert.equal(isAuthHeaderInvalid, false);
    });
  });

  describe('getTokenFromHeader', () => {
    it('returns empty string if no token in header', () => {
      const token = authUtils.getTokenFromHeader('');
      assert.equal(token, '');
    });

    it('throws error if header undefined', () => {
      assert.throws(() => authUtils.getTokenFromHeader());
    });

    it('returns token', () => {
      const token = authUtils.getTokenFromHeader('Bearer token');
      assert.equal(token, 'token');
    });
  });
});
