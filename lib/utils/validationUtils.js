const Joi = require('joi');

const validate = async (data, schema) =>
  new Promise((resolve, reject) => {
    Joi.validate(data, schema, { allowUnknown: true }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

const usernameSchema = Joi.string()
  .min(3)
  .max(30)
  .required();

const passwordSchema = Joi.string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required();

module.exports = {
  validate,
  usernameSchema,
  passwordSchema
};
