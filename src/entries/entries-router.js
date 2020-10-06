const express = require('express');
// const xss = require('xss');

const entriesService = require('./entries-service');
const blankEntries = require('../blank_entries');

const entriesRouter = express.Router();
const bodyParser = express.json();

function serializeEntry(e) {
  return {
    prompts: e.prompts, // TODO: Sanitize responses
    complete: true,
  };
}

function formatDaysEntries(querySnapshot) {
  // Start with the default questions, in case all or part of this day's entry is blank
  const entries = { ...blankEntries };
  // Nest each entry under its type (morning or evening);
  querySnapshot.forEach((doc) => {
    entries[doc.data().type] = serializeEntry(doc.data());
  });
  return entries;
}

entriesRouter
  .route('/entries/:date')
  .all((req, res, next) => {
    // Assign the entries collection to all incoming requests
    req.db = req.app.get('db').collection('journalEntries');
    next();
  })
  .get((req, res, next) => {
    entriesService.getByDate(req.db, req.params.date, req.userId)
      .then((querySnapshot) => {
        const payload = formatDaysEntries(querySnapshot);
        return res.send(payload);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { type, prompts } = req.body;
    const entryData = { type, prompts };
    // TODO: Validate entry data
    entryData.date = req.params.date;
    entryData.userId = req.userId;
    entriesService.insertEntry(req.db, entryData)
      .then(() => res.status(201).end())
      .catch(next);
  })
  .delete((req, res, next) => {
    entriesService.deleteDaysEntries(req.db, req.params.date, req.userId)
      .then(() => {
        const payload = formatDaysEntries([]); // Send back blank questions
        return res.status(200).send(payload);
      })
      .catch(next);
  });

module.exports = entriesRouter;
