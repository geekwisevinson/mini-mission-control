const Service = appRequire('lib/users/patch/service');
const Validator = appRequire('lib/users/patch/validator');
const ResponseHelpers = appRequire('helpers/responses');

const patch = (request, reply) => {
  const payload = request.payload;

  Service.patchUser(request.user, payload)
    .then(response => reply(response.toJSON()).code(200))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'PATCH',
  path: '/api/v1/users',
  handler: patch,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
