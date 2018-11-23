const Joi = require('joi');
const { usernameSchema, passwordSchema } = require('../../utils/validationUtils');

const signupSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
  avatarUrl: Joi.string()
    .min(5)
    .required()
});

const loginSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema
});

module.exports = {
  signupSchema,
  loginSchema
};
