const BaseError = require('../customErrors/BaseError');

module.exports = (err, req, res, next) => {
  // console.log('err', err);

  let error = err;

  if (!(err instanceof BaseError)) error = new BaseError(err.name, err.message, 500);

  if (error.message.indexOf('duplicate key value violates unique constraint') !== -1) {
    error.message = 'already liked';
    error.status = 400;
  }

  res.status(error.status).json({ error });
};
