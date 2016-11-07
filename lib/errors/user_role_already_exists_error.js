const util = require('util');

function UserRoleAlreadyExistsError(message) {
  this.message = message || 'User role already added.';
  this.code = 409;
}

util.inherits(UserRoleAlreadyExistsError, Error);
module.exports = UserRoleAlreadyExistsError;
