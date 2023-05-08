require('dotenv').config()
const { Model } = require('objection');
const Knex = require('knex');
console.log( process.env.DB_NAME);
const knex = Knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  },
    debug: process.env.DB_DEBUG === 'true',
})
// console.log(knex);
knex.on('query', data => {console.dir(data) });
// knex.raw('SELECT 1 + 1 AS result')
//   .then((result) => {
//     console.log('Knex is connected to Postgres:', result.rows[0].result === 2);
//   })
//   .catch((err) => {
//     console.log('Error connecting to Postgres:', err);
//   });

Model.knex(knex);

module.exports = Model;