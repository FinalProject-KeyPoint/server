require('dotenv').config();
const express = require('express');

if (process.env.NODE_ENV === 'development') {
  require('./config/mongoDev');
}

if (process.env.NODE_ENV === 'production') {
  require('./config/mongoProd');
}

if (process.env.NODE_ENV === 'test') {
  require('./config/mongoTest');
}

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/home/jap_hendy_wijaya/KeyPoint/server/bin/public'))
app.use(require('cors')())
app.use(require('morgan')('combined'))

app.use(require('./router'));
app.use(require('./middleware/errorHandler'));

module.exports = app;
