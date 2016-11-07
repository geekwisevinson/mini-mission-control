const util = require('util');

function UserRoleDoesNotExistError(message) {
  this.message = message || 'User role does not exist.';
  this.code = 404;
}

util.inherits(UserRoleDoesNotExistError, Error);
module.exports = UserRoleDoesNotExistError;
