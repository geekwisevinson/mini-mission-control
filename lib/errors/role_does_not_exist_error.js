const util = require('util');

function UserAlreadyExistsError(message) {
  this.message = message || 'Role does not exist.';
  this.code = 404;
}

util.inherits(UserAlreadyExistsError, Error);
module.exports = UserAlreadyExistsError;
