const chai = require('chai');
chai.use(require('chai-arrays'));
chai.use(require('chai-sorted'));
const { getByMostLiked } = require('../usersService');

const { expect } = chai;

describe('usersService', () => {
  describe('getByMostLiked', () => {
    it('returns list of all users ordered by most liked', async () => {
      const users = await getByMostLiked();
      expect(users).to.be.array();
      expect(users).to.be.descendingBy('likedByCount');
    });
  });
});
