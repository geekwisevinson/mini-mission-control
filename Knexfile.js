require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.MC_DATABASE_HOST,
    user: process.env.MC_DATABASE_USER,
    password: process.env.MC_DATABASE_PASSWORD,
    database: process.env.MC_DATABASE_NAME,
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './seeds',
  }
};
