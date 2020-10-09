const fetch = require('node-fetch');
const { FIREBASE_API_KEY } = require('../src/config');

const utilities = {
  getIdToken: async (auth, uid) => {
    const customToken = await auth.createCustomToken(uid);
    const body = JSON.stringify({
      token: customToken,
      returnSecureToken: true,
    });
    const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FIREBASE_API_KEY}`;
    return fetch(authURL, {
      method: 'POST',
      body,
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes.idToken);
  },
};

module.exports = utilities;
