const { validate } = require('../utils/validationUtils');

const validateBody = schema => async (req, res, next) => {
  const { body } = req;
  await validate(body, schema);
  next();
};

module.exports = { validateBody };
