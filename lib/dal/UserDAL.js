const User = require('../models/User');

const getUserWithLikesQuery = userId => {
  const selectionQuery = [
    'users.*',
    User.relatedQuery('likedBy')
      .count()
      .as('likedByCount')
  ];

  if (userId !== undefined)
    selectionQuery.push(
      User.relatedQuery('likedBy')
        .where('from', userId)
        .count()
        .as('isLiked')
    );
  return selectionQuery;
};

const createUser = async newUser =>
  User.query()
    .insert(newUser)
    .omit(['password']);

const findById = async id =>
  User.query()
    .findById(id)
    .omit(['password']);

const findByIdJoinedLikes = async (fromId, toId) =>
  User.query()
    .select(getUserWithLikesQuery(fromId))
    .where('id', toId)
    .first()
    .omit(['password']);

const findByUsername = async username => User.query().findOne({ username });

const like = async (fromId, likedUser) => likedUser.$relatedQuery('likedBy').relate(fromId);

const unlike = async (fromId, likedUser) =>
  likedUser
    .$relatedQuery('likedBy')
    .unrelate()
    .where('id', fromId);

const getByMostLiked = async userId => {
  const query = User.query()
    .select(getUserWithLikesQuery(userId))
    .omit(['password'])
    .orderBy('likedByCount', 'desc');

  return userId ? query.whereNot('id', userId) : query;
};

const updatePassword = (id, newPassword) =>
  User.query().patchAndFetchById(id, { password: newPassword });

module.exports = {
  createUser,
  findById,
  findByUsername,
  like,
  unlike,
  getByMostLiked,
  findByIdJoinedLikes,
  updatePassword
};
