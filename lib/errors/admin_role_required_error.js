const util = require('util');

function AttributesNotDefinedError(message) {
  this.message = message || 'An admin role is required to perform that action.';
  this.code = 403;
}

util.inherits(AttributesNotDefinedError, Error);
module.exports = AttributesNotDefinedError;
