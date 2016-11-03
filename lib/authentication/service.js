require('dotenv').config();

const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const User = appRequire('models/user');
const InvalidEmailPasswordError = appRequire('lib/errors/invalid_email_password_error');
const algorithm = 'HS256';

const signToken = user => jwt.sign(
  { accountId: user.get('id') },
  process.env.JWT_PRIVATE_KEY,
  {
    algorithm,
    expiresIn: '7d',
  }
);

const refreshToken = Promise.coroutine(function* (token) {
  const decodedToken = yield jwt.verifyAsync(token, process.env.JWT_PRIVATE_KEY);
  if (!decodedToken) {
    return null;
  }

  const user = yield User.forge({ id: decodedToken.accountId }).fetch();
  if (!user) {
    return null;
  }

  return signToken(user);
});

const validateToken = (request, decodedToken, callback) => {
  const error = undefined;
  const userId = decodedToken.accountId;

  User.forge({ id: userId })
    .fetch()
    .then(user => {
      if (!user) {
        return callback(error, false, user);
      }

      request.user = user; // eslint-disable-line
      return callback(error, true, user);
    })
    .catch((err) => {
      console.error(err.stack);
      callback(err, false, undefined);
    });
};

const validateCredentials = Promise.coroutine(function* (attributes) {
  const user = yield User.forge({ email: attributes.email }).fetch();

  if (!user) {
    throw new InvalidEmailPasswordError();
  }

  return yield bcrypt.compareAsync(
    attributes.password,
    user.get('encryptedPassword')
  )
  .then((isValid) => {
    if (!isValid) {
      throw new InvalidEmailPasswordError();
    }

    return user;
  });
});

module.exports = {
  algorithm,
  signToken,
  refreshToken,
  validateToken,
  validateCredentials,
};
