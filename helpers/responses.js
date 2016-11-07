const logErrorAndRespond = (err, reply) => {
  console.error(err.stack);
  console.log(err);
  reply.badImplementation('Unable to perform request', err.message);
};

module.exports = {
  logErrorAndRespond,
};
