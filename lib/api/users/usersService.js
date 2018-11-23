const dal = require('../../dal/UserDAL');

const toggleLike = async (fromId, toId, isLike) => {
  const actionString = isLike ? 'like' : 'unlike';

  // eslint-disable-next-line eqeqeq
  if (fromId == toId) throw Error(`Cannot ${actionString} yourself!`);

  const likedUser = await dal.findById(toId);

  if (isLike) {
    await dal.like(fromId, likedUser);
  } else {
    await dal.unlike(fromId, likedUser);
  }
  const userWithLikes = await dal.findByIdJoinedLikes(fromId, toId);

  return {
    data: {
      message: `${actionString} successfull!`,
      likedUser: userWithLikes
    }
  };
};

const getByMostLiked = async userId => dal.getByMostLiked(userId);

module.exports = {
  toggleLike,
  getByMostLiked
};
