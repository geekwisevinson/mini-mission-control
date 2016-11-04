const util = require('util');

function UserNotFoundError(message) {
  this.message = message || 'User not found';
  this.code = 404;
}

util.inherits(UserNotFoundError, Error);
module.exports = UserNotFoundError;
