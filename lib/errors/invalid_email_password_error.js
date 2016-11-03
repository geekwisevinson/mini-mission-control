const util = require('util');

function AttributesNotDefinedError(message) {
  this.message = message || 'Invalid email or password. Please try again.';
  this.code = 403;
}

util.inherits(AttributesNotDefinedError, Error);
module.exports = AttributesNotDefinedError;
