const { Client } = require('pg');

const client = new Client({
  user: 'sebastian',
  host: 'localhost',
  database: 'kartify'
});

client.connect(e => {
  if (e) {
    console.error(e);
  } else {
    console.log('Connected to PostgreSQL server');
  }
})
module.exports = client;