const Promise = require('bluebird');
const Bookshelf = appRequire('config/bookshelf');
const Role = appRequire('models/role');
const AdminRoleRequiredError = appRequire('lib/errors/admin_role_required_error');
const RoleAlreadyExistsError = appRequire('lib/errors/role_already_exists_error');

const createRole = Promise.coroutine(function* (user, { name }) {
  const isAdmin = yield user.isAdmin();
  if (!isAdmin) {
    throw new AdminRoleRequiredError();
  }

  const roleExists = yield Role.forge({ name })
    .fetch({ require: true })
    .then(() => true)
    .catch(Bookshelf.Model.NotFoundError, () => false);

  if (roleExists) {
    throw new RoleAlreadyExistsError();
  }
  console.log(roleExists);
  return yield Role.forge({ name }).save();
});

module.exports = {
  createRole,
};
