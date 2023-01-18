import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onUserCreate = functions.auth
  .user()
  .onCreate(async (user, _context) => {
    await admin.firestore().collection('users').doc(user.uid).set({
      id: user.uid,
      emailAddress: user.email,
      verified: user.emailVerified,
    });
  });
