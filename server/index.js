const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db/index.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', () => console.log('jared'))
app.get('/test', (req, res) => {
  res.status(200).json({test: 'hello world'})
})

const port = 80;
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});