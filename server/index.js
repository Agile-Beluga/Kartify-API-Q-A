const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', router);

const port = 2020;
app.listen(port, () => console.log(`Web server listening on port ${port}`));