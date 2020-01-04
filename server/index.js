const { Client } = require('pg');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Database
const db = new Client();
setTimeout(() => {
  db.connect(e => {
    if (e) {
      console.error(e);
    } else {
      console.log('Connected to PostgreSQL server!');
    }
  })
}, 6000);


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', () => console.log('rebuilt'))

app.get('/test', (req, res) => {
  const query = {
    text: 'INSERT INTO questions(product_id, asker_name, body, date, helpful) VALUES($1, $2, $3, $4, $5)',
    values: ['4', 'Sebastian', 'You like it?', '12/5/2008', '8'] 
  }

  db.query(query)
  .then((data) => {
    console.log(data);
    res.status(200).json(data);
  })
  .catch(e => {
    console.error(e);
    res.sendStatus(404);
  })
})

const port = 80;
app.listen(port, () => console.log(`Web server listening on port ${port}`));