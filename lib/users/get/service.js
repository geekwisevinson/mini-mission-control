const User = appRequire('models/user');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');

const getUsers = user => User.forge({}).fetchAll();

const searchUsers = (user, query) => User.forge({
  userId: user.get('id'),
})
.where('name', 'ILIKE', `%${query}%`)
.fetchAll();

const getUser = (user, userId) => User.forge({
  id: userId,
})
.fetch()
.then((user) => {
  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
});

module.exports = {
  getUsers,
  searchUsers,
  getUser,
};
