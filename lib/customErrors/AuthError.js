const BaseError = require('./BaseError');

class AuthError extends BaseError {
  constructor(message) {
    super('AuthError', message || 'authentication failed', 401);
  }
}

module.exports = AuthError;
