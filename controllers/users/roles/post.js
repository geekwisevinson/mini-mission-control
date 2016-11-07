const Service = appRequire('lib/users/roles/post/service');
const Validator = appRequire('lib/users/roles/post/validator');
const ResponseHelpers = appRequire('helpers/responses');
const AdminRoleRequiredError = appRequire('lib/errors/admin_role_required_error');
const RoleDoesNotExistError = appRequire('lib/errors/role_does_not_exist_error');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');
const UserRoleAlreadyExistsError = appRequire('lib/errors/user_role_already_exists_error');

const patch = (request, reply) => {
  const payload = request.payload;
  const userId = request.params.id;

  Service.createUserRole(request.user, userId, payload)
    .then(response => reply(response.toJSON()).code(200))
    .catch(
      AdminRoleRequiredError,
      RoleDoesNotExistError,
      UserNotFoundError,
      UserRoleAlreadyExistsError,
      err => reply.boom(err.code, err.message)
    )
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'POST',
  path: '/api/v1/users/{id}/roles',
  handler: patch,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
