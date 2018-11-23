class BaseError extends Error {
  constructor(name, message, status) {
    super();

    if (Error.captureStackTrace) Error.captureStackTrace(this, BaseError);

    this.name = name || 'UnknownError';
    this.message = message || 'something went wrong';
    this.status = status || 500;
  }
}

module.exports = BaseError;
