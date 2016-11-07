const Role = appRequire('models/role');

const getRoles = () => Role.forge({}).fetchAll();

module.exports = {
  getRoles
};
