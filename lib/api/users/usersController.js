const service = require('./usersService');

const getByMostLiked = async (req, res, next) => {
  const authUser = req.authenticatedUser;
  const users = await service.getByMostLiked(authUser ? authUser.id : authUser);
  res.status(200).json({ data: { users } });
};

const getById = async (req, res, next) => {
  const response = await service.create(req.body);
  res.json(response);
};

const like = async (req, res, next) => {
  const response = await service.toggleLike(req.authenticatedUser.id, req.params.id, true);
  res.json(response);
};

const unlike = async (req, res, next) => {
  const response = await service.toggleLike(req.authenticatedUser.id, req.params.id, false);
  res.json(response);
};

module.exports = {
  getByMostLiked,
  getById,
  like,
  unlike
};
