/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_TEST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongo KeyPoint test connected');
});
