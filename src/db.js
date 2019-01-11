/**
 * Interface to PostgresSQL client
 */

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.CONNECTION_STRING,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
});

// export default db;
module.exports = db;
