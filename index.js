require('apprequire')(__dirname);
const Promise = require('bluebird');

Promise.coroutine(function* () {
  const server = yield require('./server');

  yield server.startAsync();
  console.info(`Server started at port ${server.info.port}`);
})();
