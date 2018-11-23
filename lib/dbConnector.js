const Knex = require('knex');
const { Model } = require('objection');
const dbConfig = require('../knexfile');

const connect = () => {
  const db = Knex(dbConfig.development);

  Model.knex(db);
};

module.exports = {
  connect
};
