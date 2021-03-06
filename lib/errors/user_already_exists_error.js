const util = require('util');

function UserAlreadyExistsError(message) {
  this.message = message || 'User already taken';
  this.code = 409;
}

util.inherits(UserAlreadyExistsError, Error);
module.exports = UserAlreadyExistsError;
