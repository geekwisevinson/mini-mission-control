const util = require('util');

function AttributesNotDefinedError(message) {
  this.message = message || 'Invalid email or password; please try again.';
  this.code = 400;
}

util.inherits(AttributesNotDefinedError, Error);
module.exports = AttributesNotDefinedError;
