const { STATUS_BAD_AUTH } = require('./constants');

class ErrorBadAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_AUTH;
  }
}

module.exports = { ErrorBadAuth };
