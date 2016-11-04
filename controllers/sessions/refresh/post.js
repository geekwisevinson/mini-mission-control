const Service = appRequire('lib/authentication/service');
const Validator = appRequire('lib/sessions/post/refresh/validator');

const ResponseHelpers = appRequire('helpers/responses');

const post = (request, reply) => {
  const token = request.payload.token;
  Service.refreshToken(token)
    .then((refreshedToken) => {
      if (!refreshedToken) {
        return reply.unauthorized('Invalid JWT provided, please reauthenticate.');
      }

      return reply({
        token: refreshedToken,
      });
    })
    .catch((err) => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = {
  method: 'POST',
  path: '/api/v1/sessions/refresh',
  handler: post,
  config: {
    auth: false,
    validate: {
      payload: Validator,
    },
  },
};
