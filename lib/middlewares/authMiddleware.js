const AuthError = require('../customErrors/AuthError');
const { verifyToken, isAuthHeaderInvalid, getTokenFromHeader } = require('../utils/authUtils');
const { findById } = require('../dal/UserDAL');

const authenticate = async req => {
  const authHeader = req.headers.authorization;

  if (isAuthHeaderInvalid(authHeader)) throw new AuthError('invalid header');

  const token = getTokenFromHeader(authHeader);
  if (!token) throw new AuthError('invalid token');

  const decoded = await verifyToken(token, process.env.JWT_SECRET);
  const user = await findById(decoded.id);
  req.authenticatedUser = user;
};

const authenticateStrict = async (req, res, next) => {
  await authenticate(req, res, next, true);
  next();
};

const authenticateWeak = async (req, res, next) => {
  try {
    await authenticate(req, res, next, false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('weak auth failed', error);
  } finally {
    next();
  }
};

module.exports = {
  authenticateStrict,
  authenticateWeak
};
