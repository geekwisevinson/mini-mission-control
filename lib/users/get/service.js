const User = appRequire('models/user');
const UserNotFoundError = appRequire('lib/errors/user_not_found_error');

const getUsers = () => User.forge({}).fetchAll({ withRelated: ['roles'] });

const searchUsers = (user, query) => User.forge({
  userId: user.get('id'),
})
.where('name', 'ILIKE', `%${query}%`)
.fetchAll({ withRelated: ['roles'] });

const getUser = (user, userId) => User.forge({
  id: userId,
})
.fetch({ withRelated: ['roles'] })
.then(retrievedUser => {
  if (!retrievedUser) {
    throw new UserNotFoundError();
  }

  return retrievedUser;
});

module.exports = {
  getUsers,
  searchUsers,
  getUser,
};
