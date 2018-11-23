const { updatePassword } = require('../../dal/UserDAL');
const { hashPassword } = require('../../utils/authUtils');

const changePassword = async (id, { newPassword }) =>
  updatePassword(id, await hashPassword(newPassword));

module.exports = {
  changePassword
};
