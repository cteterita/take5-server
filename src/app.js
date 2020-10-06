require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const entriesRouter = require('./entries/entries-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  if (req.headers.authtoken) {
    req.app.get('auth').verifyIdToken(req.headers.authtoken)
      .then((user) => {
        req.userId = user.uid;
        next();
      })
      .catch(() => {
        res.status(403).send('Unauthorized');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(entriesRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
  next();
});

module.exports = app;
