const Service = appRequire('lib/users/roles/delete/service');
const Validator = appRequire('lib/users/roles/delete/validator');
const ResponseHelpers = appRequire('helpers/responses');
const AdminRoleRequiredError = appRequire('lib/errors/admin_role_required_error');
const RoleDoesNotExistError = appRequire('lib/errors/role_does_not_exist_error');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');
const UserRoleDoesNotExistError = appRequire('lib/errors/user_role_does_not_exist_error');

const del = (request, reply) => {
  const payload = request.payload;
  const userId = request.params.id;

  Service.deleteUserRole(request.user, userId, payload)
    .then(response => reply(response.toJSON()).code(204))
    .catch(
      AdminRoleRequiredError,
      RoleDoesNotExistError,
      UserNotFoundError,
      UserRoleDoesNotExistError,
      err => reply.boom(err.code, err.message)
    )
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'DELETE',
  path: '/api/v1/users/{id}/roles',
  handler: del,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
