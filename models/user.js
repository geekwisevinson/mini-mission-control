const Bookshelf = require('../config/bookshelf');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const BaseModel = appRequire('models/base');

module.exports = Bookshelf.model('User', BaseModel.extend({
  hidden: ['encryptedPassword'],
  tableName: 'users',
  initialize() {
    this.on('creating', this.hashPassword, this);
  },
  hashPassword: model => new Promise((resolve, reject) => {
    bcrypt.hash(model.attributes.password, 12, (err, hash) => {
      if (err) {
        reject(err);
      }

      model.unset('password');
      model.set('encryptedPassword', hash);

      resolve(hash);
    });
  }),
  roles() {
    return this.belongsToMany('Role');
  },
  isAdmin() {
    return this.roles()
      .query('where', 'roles.name', 'admin')
      .fetch()
      .then(roles => roles.size() > 0);
  },
}));
