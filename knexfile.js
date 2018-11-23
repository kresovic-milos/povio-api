require('dotenv').config();
const pg = require('pg');

// pg.defaults.ssl = true;

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DB_URL
  },
  development: {
    client: 'pg',
    connection: process.env.DB_URL_DEV
  }
};
