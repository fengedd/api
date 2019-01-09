const knex = require('../db');
const db = knex.db;

function hey() {
  db('players')
    .select('id')
    .then(val => console.log(val))
    .catch(() => console.log('error'))
    .finally(() => db.destroy());
}
function insertPlayer(player, options, cb) {
  //insert
  const id = 690;

  db('players')
    .insert({ id: 690 })
    .then(() => console.log('Inserted'))
    .finally(() => {
      hey();
      db.destroy();
    });

  /*
  knex
    .db('players')
    .insert(id)
    .then(() => console.log('Inserted'))
    .catch(() => console.log('error'));
  //    .finally(() => db.destroy());
  */
  //upsert
}

insertPlayer(null, null, null);
