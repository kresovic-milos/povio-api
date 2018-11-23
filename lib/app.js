const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');
const dbConnector = require('./dbConnector');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

dbConnector.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/api', router);
app.use(errorHandler);

module.exports = app;
