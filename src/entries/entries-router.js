const express = require('express');
const xss = require('xss');

const entriesService = require('./entries-service');
const blankEntries = require('../blank-entries');

const entriesRouter = express.Router();
const bodyParser = express.json();

const validEntryTypes = ['morning', 'evening'];

function serializeEntry(e) {
  const sanitizedPrompts = e.prompts.map((p) => {
    const { prompt, promptId, responses } = p;
    return {
      prompt,
      promptId,
      responses: responses.map((r) => xss(r)),
    };
  });
  return {
    prompts: sanitizedPrompts,
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
  .route('/entries/:date(20[0-2][0-9]-[0-1][0-9]-[0-3][0-9]$)') // Match only valid dates (more or less)
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
    if (!prompts) {
      return res.status(400).send('Invalid data: prompts are required');
    }
    if (!validEntryTypes.includes(type)) {
      return res.status(400).send(`Invalid data: must be one of ${validEntryTypes.join(', ')}`);
    }
    entryData.date = req.params.date;
    entryData.userId = req.userId;
    return entriesService.insertEntry(req.db, entryData)
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
