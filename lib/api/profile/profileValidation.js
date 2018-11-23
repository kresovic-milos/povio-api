const Joi = require('joi');
const { passwordSchema } = require('../../utils/validationUtils');

const updatePasswordSchema = Joi.object({
  newPassword: passwordSchema
});

module.exports = {
  updatePasswordSchema
};
