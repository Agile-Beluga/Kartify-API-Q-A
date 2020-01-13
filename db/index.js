const { Pool, Client } = require('pg');

const client = new Client ({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || null,
  database: process.env.PGDATABASE || 'kartify',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432
});

client.connect(e => {
  if (e) {
    console.error(e)
  } else {
    console.log('Successful connection to PostgreSQL', process.env.PGHOST, process.env.PGPORT)
  }
});

module.exports = client;