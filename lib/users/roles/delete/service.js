const Promise = require('bluebird');

const Bookshelf = appRequire('config/bookshelf');
const User = appRequire('models/user');
const Role = appRequire('models/role');
const AdminRoleRequiredError = appRequire('lib/errors/admin_role_required_error');
const RoleDoesNotExistError = appRequire('lib/errors/role_does_not_exist_error');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');
const UserRoleDoesNotExistError = appRequire('lib/errors/user_role_does_not_exist_error');

const deleteUserRole = Promise.coroutine(function* (user, userId, { name }) {
  const isAdmin = yield user.isAdmin();
  if (!isAdmin) {
    throw new AdminRoleRequiredError();
  }

  const roleNameExists = yield Role.forge({ name })
    .fetch({ require: true })
    .then(() => true)
    .catch(Bookshelf.Model.NotFoundError, () => false);

  if (!roleNameExists) {
    throw new RoleDoesNotExistError();
  }

  const userWithRoleBeingAdded = yield User.forge({ id: userId }).fetch({ withRelated: ['roles'] });
  if (!userWithRoleBeingAdded) {
    throw new UserNotFoundError();
  }
  const doesNotHaveRole = userWithRoleBeingAdded
    .related('roles')
    .every(role => role.get('name') !== name);

  if (doesNotHaveRole) {
    throw new UserRoleDoesNotExistError();
  }

  return yield userWithRoleBeingAdded.roles()
    .query('where', 'name', name)
    .detach(userWithRoleBeingAdded.get('id'))
    .then(() => userWithRoleBeingAdded.refresh());
});

module.exports = {
  deleteUserRole,
};
