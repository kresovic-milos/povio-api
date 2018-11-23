const service = require('./authService');

const signUp = async (req, res, next) => {
  const user = await service.signUp(req.body);
  res.status(201).json({ data: { user } });
};

const logIn = async (req, res, next) => {
  const token = await service.getToken(req.body);
  res.json({ data: { token } });
};

module.exports = {
  signUp,
  logIn
};
