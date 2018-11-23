const UserDAL = require('../../dal/UserDAL');
const authUtils = require('../../utils/authUtils');

const signUp = async ({ username, password, avatarUrl }) => {
  const user = await UserDAL.createUser({
    username,
    password: authUtils.hashPassword(password),
    avatarUrl
  });
  return user;
};

const getToken = async ({ username, password }) => {
  const user = await UserDAL.findByUsername(username);

  if (!user) throw Error('invalid username!');
  if (!authUtils.isPasswordValid(password, user.password)) throw Error('invalid password!');

  return authUtils.createToken(user.id, process.env.JWT_SECRET);
};

module.exports = {
  signUp,
  getToken,
  sinonable: { UserDAL, authUtils }
};
