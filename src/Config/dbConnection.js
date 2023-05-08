require('dotenv').config()
const { Model } = require('objection');
const Knex = require('knex');
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
knex.on('query', data => {console.dir(data) });
Model.knex(knex);

module.exports = Model;