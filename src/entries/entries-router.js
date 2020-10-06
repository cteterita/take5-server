const express = require('express');
// const xss = require('xss');

const entriesRouter = express.Router();

entriesRouter
  .route('/entries')
  .get((req, res) => {
    const db = req.app.get('db');
    const entries = db.collection('journalEntries');
    entries.get()
      .then((querySnapshot) => {
        const payload = [];
        querySnapshot.forEach((doc) => payload.push(doc.data()));
        return res.send(payload);
      });
  });

module.exports = entriesRouter;
