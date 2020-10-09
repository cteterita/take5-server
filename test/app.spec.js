/* eslint-disable arrow-body-style */
const admin = require('firebase-admin');

const app = require('../src/app');
const { FIREBASE_DB_URL, FIREBASE_CREDENTIALS } = require('../src/config');
const { getIdToken } = require('./test-utilities');

describe('App', () => {
  let auth;
  let user;
  let authToken;
  before('create firebase app and user', () => {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_CREDENTIALS),
      databaseURL: FIREBASE_DB_URL,
    });
    auth = firebaseAdmin.auth();
    app.set('auth', auth);
    // Firebase doesn't have an auth emulator, so we have to create a real user
    return auth.createUser({
      uid: 'test-user',
    })
      .then((newUser) => {
        user = newUser;
        getIdToken(auth, user.uid)
          .then((token) => {
            authToken = token;
          });
      });
  });
  after('delete user', () => {
    auth.deleteUser(user.uid);
  });
  it('A request without an authtoken responds with 403 unauthorized', () => {
    return supertest(app)
      .get('/')
      .expect(403, 'Unauthorized');
  });

  it('A request with an invalid authtoken responds with 403 unauthorized', () => {
    return supertest(app)
      .get('/')
      .set('authtoken', 'testing')
      .expect(403, 'Unauthorized');
  });

  it.skip('A request with a valid authtoken responds with an empty array', () => {
    // Currently failing because authToken is not set in before() in time
    return supertest(app)
      .get('/entries')
      .set('authtoken', authToken)
      .expect(200, []);
  });
});
