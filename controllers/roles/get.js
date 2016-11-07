const Service = appRequire('lib/roles/get/service');
const ResponseHelpers = appRequire('helpers/responses');

const getRolesPromise = () => Service.getRoles();


const getRoles = (request, reply) => {
  getRolesPromise()
    .then(response => reply(response.toJSON()).code(200))
    .catch(err => ResponseHelpers.logErrorAndRespond(err, reply));
};

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/roles',
    handler: getRoles,
    config: {
      auth: false,
    },
  },
];
