const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = password => bcrypt.hashSync(password, 8);

const isPasswordValid = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const createToken = (id, secret) => jwt.sign({ id }, secret, { expiresIn: 36000 });

const verifyToken = async (token, secret) => jwt.verify(token, secret);

const isAuthHeaderInvalid = authHeader => !authHeader || !authHeader.startsWith('Bearer ');

const getTokenFromHeader = header => header.slice(7, header.length);

module.exports = {
  hashPassword,
  isPasswordValid,
  createToken,
  verifyToken,
  isAuthHeaderInvalid,
  getTokenFromHeader
};
