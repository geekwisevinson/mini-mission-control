const Promise = require('bluebird');
const Hapi = Promise.promisifyAll(require('hapi'));

const AuthService = appRequire('lib/authentication/service');

const server = new Hapi.Server({ debug: false });
server.connection({ port: 7000, routes: { cors: true } });

const routes = appRequire('routes');

const good = {
  register: require('good'),
  options: {
    ops: { interval: 1000 },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*',
            },
          ],
        },
        {
          module: 'good-console',
          args: [
            {
              format: 'MM/DD/YYYY HH:mm:ss A',
            },
          ],
        },
        'stdout',
      ],
    },
  },
};

module.exports = server.registerAsync([
  require('inject-then'),
  require('hapi-boom-decorators'),
  require('hapi-auth-jwt'),
  good,
]).then((err) => {
  if (err) {
    console.error('Unable to load plugin, info below:');
    console.error(err);
  }

  server.auth.strategy('token', 'jwt', {
    key: process.env.JWT_PRIVATE_KEY,
    validateFunc: AuthService.validateToken,
    verifyOptions: { algorithms: [AuthService.algorithm] },
  });
  server.auth.default('token');

  server.route(routes);

  return server;
});
