/* eslint-disable arrow-body-style */
const admin = require('firebase-admin');
const supertest = require('supertest');

const app = require('../src/app');
const { FIREBASE_TEST_DB_URL, FIREBASE_CREDENTIALS } = require('../src/config');
const { getIdToken } = require('./test-utilities');
const blankEntries = require('../src/blank-entries');

describe('Entries endpoint', () => {
  let auth;
  let user;
  let authToken;
  let firebaseAdmin;
  before('create firebase app and user', () => {
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_CREDENTIALS),
    }, 'app');
    auth = firebaseAdmin.auth();
    const db = firebaseAdmin.firestore();
    db.settings({
      host: FIREBASE_TEST_DB_URL,
      ssl: false,
    });
    app.set('db', db);
    app.set('auth', auth);
    // Firebase doesn't have an auth emulator, so we have to create a real user
    return auth.createUser({
      uid: 'test-user',
    })
      .then((newUser) => {
        user = newUser;
      });
  });
  before('set authToken', () => {
    return getIdToken(auth, user.uid)
      .then((token) => {
        authToken = token;
      });
  });
  after('delete user', () => {
    auth.deleteUser(user.uid);
  });

  context('assuming the database is empty', () => {
    it('returns the blank prompts', () => {
      return supertest(app)
        .get('/entries/2020-10-10')
        .set('authtoken', authToken)
        .expect(200, blankEntries);
    });

    it('returns 404 for a bogus date', () => {
      return supertest(app)
        .get('/entries/2020-10-40')
        .set('authtoken', authToken)
        .expect(404);
    });

    it('rejects an entry with missing prompts', () => {
      const body = {
        type: 'morning',
      };
      return supertest(app)
        .post('/entries/2020-10-10')
        .send(body)
        .set('authtoken', authToken)
        .expect(400, 'Invalid data: prompts are required');
    });

    it('rejects an entry with a missing type', () => {
      const body = {
        prompts: blankEntries.morning.prompts,
      };
      return supertest(app)
        .post('/entries/2020-10-10')
        .send(body)
        .set('authtoken', authToken)
        .expect(400, 'Invalid data: must be one of morning, evening');
    });

    it('rejects an entry with an invalid type', () => {
      const body = {
        type: 'invalid',
        prompts: blankEntries.morning.prompts,
      };
      return supertest(app)
        .post('/entries/2020-10-10')
        .send(body)
        .set('authtoken', authToken)
        .expect(400, 'Invalid data: must be one of morning, evening');
    });

    it('saves a new entry', () => {
      const body = {
        type: 'morning',
        prompts: blankEntries.morning.prompts,
      };
      return supertest(app)
        .post('/entries/2020-10-10')
        .send(body)
        .set('authtoken', authToken)
        .expect(201);
    });

    it('gets the entry that was just saved', () => {
      const expected = blankEntries;
      expected.morning.complete = true;
      return supertest(app)
        .get('/entries/2020-10-10')
        .set('authtoken', authToken)
        .expect(200, expected);
    });

    it('deletes the entries for a day', () => {
      const expected = blankEntries;
      expected.morning.complete = true;
      return supertest(app)
        .delete('/entries/2020-10-10')
        .set('authtoken', authToken)
        .expect(200, blankEntries);
    });

    it('gets the blank prompts again', () => {
      return supertest(app)
        .get('/entries/2020-10-10')
        .set('authtoken', authToken)
        .expect(200, blankEntries);
    });
  });
});
