const Service = appRequire('lib/authentication/service');
const Validator = appRequire('lib/sessions/post/validator');

const ResponseHelpers = appRequire('helpers/responses');
const InvalidEmailPasswordError = appRequire('lib/errors/invalid_email_password_error');

const post = (request, reply) => {
  const payload = request.payload;
  Service.validateCredentials(payload)
    .then((user) => reply({ token: Service.signToken(user) }))
    .catch(InvalidEmailPasswordError, (err) => reply.boom(err.code, err.message))
    .catch((err) => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'POST',
  path: '/api/v1/sessions',
  handler: post,
  config: {
    auth: false,
    validate: {
      payload: Validator,
    },
  },
};
