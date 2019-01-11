const knex = require('../db');
const util = require('util');
const db = knex.db;

async function insertPlayer(player) {
  const table = 'players';
  const data = player;
  const insert = db(table).insert(data);
  const update = db.queryBuilder().update(data);
  const res = db
    .raw(`? ON CONFLICT (id) DO ? returning *`, [insert, update])
    .get('rows')
    .get(0)
    .finally(() => db.destroy());
  return res;
}

async function getPlayer(id) {
  const table = 'players';
  const data = id;
  const query = db(table)
    .select('*')
    .where('id', data)
    .toQuery();
  const res = db
    .raw(query)
    .get('rows')
    .get(0)
    .finally(() => db.destroy());
  return res;
}

const caller = async () => {
  const result = await getPlayer(1); //insertPlayer(null, null, null);
  console.log(result);
};

caller();

// insertPlayer(null, null, null);
