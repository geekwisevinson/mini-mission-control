const Service = appRequire('lib/users/post/service');
const Validator = appRequire('lib/users/post/validator');

const ResponseHelpers = appRequire('helpers/responses');
const UserAlreadyExistsError = appRequire('lib/errors/user_already_exists_error');

const post = (request, reply) => {
  const payload = request.payload;

  Service.createUser(payload)
    .then(response => reply(response.toJSON()).code(201))
    .catch(UserAlreadyExistsError, err => reply.boom(err.code, err.message))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'POST',
  path: '/api/v1/users',
  handler: post,
  config: {
    auth: false,
    validate: {
      payload: Validator,
    },
  },
};
