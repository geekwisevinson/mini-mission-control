const Promise = require('bluebird');

const User = appRequire('models/user');
const UserAlreadyExistsError = appRequire('lib/errors/user_already_exists_error');
const AuthService = appRequire('lib/authentication/service');

const createUser = Promise.coroutine(function* (attributes) {
  const existingUser = yield User.forge({
    email: attributes.email,
  }).fetch();

  if (existingUser) {
    throw new UserAlreadyExistsError('Email already taken');
  }

  return yield User.forge(attributes).save()
    .then((user) => {
      user.set('token', AuthService.signToken(user));
      return user;
    });
});

module.exports = {
  createUser,
};
