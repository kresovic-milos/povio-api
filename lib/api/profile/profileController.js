const service = require('./profileService');

const getProfile = async (req, res, next) => {
  res.json({ profile: req.authenticatedUser });
};

const updatePassword = async (req, res, next) => {
  await service.changePassword(req.authenticatedUser.id, req.body);
  res.json({ data: { message: 'password changed successfully!' } });
};

module.exports = {
  getProfile,
  updatePassword
};
