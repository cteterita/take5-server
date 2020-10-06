const express = require('express');
// const xss = require('xss');

const entriesRouter = express.Router();

entriesRouter
  .route('/entries')
  .all((req, res, next) => {
    req.db = req.app.get('db').collection('journalEntries');
    next();
  })
  .get((req, res) => {
    req.db.get()
      .then((querySnapshot) => {
        const payload = [];
        querySnapshot.forEach((doc) => payload.push(doc.data()));
        return res.send(payload);
      });
  });

module.exports = entriesRouter;
