const admin = require('firebase-admin');

const app = require('./app');
const { PORT, FIREBASE_DB_URL, FIREBASE_CREDENTIALS } = require('./config');

// Initialize authentication service
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS),
  databaseURL: FIREBASE_DB_URL,
});
const auth = firebaseAdmin.auth();
app.set('auth', auth);

// Initialize database
const db = firebaseAdmin.firestore();
app.set('db', db);

app.listen(PORT);
