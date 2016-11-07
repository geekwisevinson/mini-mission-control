exports.up = knex =>
  knex.schema.createTable('roles_users', table => {
    table.increments();
    table.integer('role_id');
    table.integer('user_id');
    table.timestamps(false, true);
  });

exports.down = knex =>
  knex.schema.dropTable('roles_users');
