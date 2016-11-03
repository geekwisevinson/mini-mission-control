const util = require('util');

function AttributesNotDefinedError(message) {
  this.message = message || 'Model attributes are not defined';
  this.code = 500;
}

util.inherits(AttributesNotDefinedError, Error);
module.exports = AttributesNotDefinedError;
