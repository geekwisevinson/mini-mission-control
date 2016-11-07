const Bookshelf = require('../config/bookshelf');
const BaseModel = appRequire('models/base');

module.exports = Bookshelf.model('Role', BaseModel.extend({
  hidden: ['_pivot_user_id', '_pivot_role_id'],
  tableName: 'roles',
  users() {
    return this.belongsToMany('User');
  },
}));
