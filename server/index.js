const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});