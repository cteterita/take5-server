const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

const app = require('./app');
const { PORT, FIREBASE_DB_URL } = require('./config');

// Initialize authentication service
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DB_URL,
});
const auth = firebaseAdmin.auth();
app.set('auth', auth);

// Initialize database
const db = firebaseAdmin.firestore();
app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
