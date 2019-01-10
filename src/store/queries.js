const knex = require('../db');
const util = require('util');
const db = knex.db;

// function upsert(db, table, row, conflict) {}
function insertPlayer(player, options, cb) {
  const table = 'players';
  const data = { id: 611920, name: 'whothesssi it' };
  const insert = db(table).insert(data);
  const update = db.queryBuilder().update(data);
  const res = db
    .raw(`? ON CONFLICT (id) DO ? returning *`, [insert, update])
    .get('rows')
    .get(0)
    .then(val => console.log(val))
    .finally(() => db.destroy());
}

insertPlayer(null, null, null);
