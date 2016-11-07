const Service = appRequire('lib/roles/post/service');
const Validator = appRequire('lib/roles/post/validator');
const ResponseHelpers = appRequire('helpers/responses');
const AdminRoleRequiredError = appRequire('lib/errors/admin_role_required_error');
const RoleAlreadyExistsError = appRequire('lib/errors/role_already_exists_error');

const post = (request, reply) => {
  const payload = request.payload;

  Service.createRole(request.user, payload)
    .then(response => reply(response.toJSON()).code(201))
    .catch(AdminRoleRequiredError, RoleAlreadyExistsError, err => reply.boom(err.code, err.message))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'POST',
  path: '/api/v1/roles',
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
