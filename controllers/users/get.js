const Service = appRequire('lib/users/get/service');
const ResponseHelpers = appRequire('helpers/responses');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');

const getUsersPromise = (user, query) =>
  query ? Service.searchUsers(user, query) : Service.getUsers(user);

  // if (query) {
  //   return Service.searchUsers(user, query);
  // }
  //
  // return Service.getUsers(user);

const getUsers = (request, reply) => {
  getUsersPromise(request.user, request.query.q)
    .then(response => reply(response.toJSON()).code(200))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

const getUser = (request, reply) => {
  const userId = request.params.id;

  Service.getUser(request.user, userId)
    .then(response => reply(response.toJSON()).code(200))
    .catch(UserNotFoundError, err => reply.boom(err.code, err.message))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/users',
    handler: getUsers,
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    handler: getUser,
    config: {
      auth: false,
    },
  },
];
