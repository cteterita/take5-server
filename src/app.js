require('dotenv').config();
const admin = require('firebase-admin');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV, FIREBASE_DB_URL } = require('./config');
const serviceAccount = require('../firebase.json');

const app = express();

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DB_URL,
});

const db = firebaseAdmin.firestore();
const entries = db.collection('journalEntries');

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/', (req, res, next) => {
  if (req.headers.authtoken) {
    firebaseAdmin.auth().verifyIdToken(req.headers.authtoken)
      .then((user) => {
        console.log(user);
        next();
      }).catch(() => {
        res.status(403).send('Unauthorized');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
});

app.get('/', (req, res) => {
  entries.get()
    .then((querySnapshot) => {
        console.log(querySnapshot);
        let payload = [];
        querySnapshot.forEach((doc) => payload.push(doc.data()));
        return res.send(payload);
    });
});

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
  next();
});

module.exports = app;
