const patchUser = (user, attributes) => user.save(attributes, { patch: true });

module.exports = {
  patchUser,
};
