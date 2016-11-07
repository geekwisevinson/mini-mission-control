exports.up = knex =>
  knex.schema.createTable('roles', table => {
    table.increments();
    table.string('name');
    table.string('created_by');
    table.timestamps(false, true);
  });

exports.down = knex =>
  knex.schema.dropTable('roles');
