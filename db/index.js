const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'sebastian',
  database: 'kartify',
  port: 5432,
});

client.connect(error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to PostgreSQL server');
  }
});

module.exports = client;