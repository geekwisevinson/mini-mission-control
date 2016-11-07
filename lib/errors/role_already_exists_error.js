const util = require('util');

function UserAlreadyExistsError(message) {
  this.message = message || 'Role already created.';
  this.code = 409;
}

util.inherits(UserAlreadyExistsError, Error);
module.exports = UserAlreadyExistsError;
