const logErrorAndRespond = (err, reply) => {
  console.error(err.stack);
  reply.badImplementation('Unable to perform request', err.message);
};

module.exports = {
  logErrorAndRespond,
};
