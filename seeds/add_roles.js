const roles = [
  'admin',
  'geekwise',
  'xcelerate',
  'events',
  'shift3',
];

exports.seed = (knex, Promise) => {
  const tableName = 'roles';

  return knex(tableName).del()
    .then(() => Promise.map(
      roles,
      role => knex(tableName).insert({
        name: role,
        created_by: 'jsoberal@bitwiseindustries.com',
      })
    ));
};
