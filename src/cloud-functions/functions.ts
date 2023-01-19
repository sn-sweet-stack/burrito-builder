import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import { Burrito } from '../hooks/useBurito';

export interface Data {
  burrito: Burrito;
}

const stripe = new Stripe('API_KEY', {
  apiVersion: '2022-11-15',
});

admin.initializeApp();

export const onUserCreate = functions
  .region('europe-central2')
  .auth.user()
  .onCreate(async (user, context) => {
    await admin.firestore().collection('users').doc(user.uid).set({
      id: user.uid,
      emailAddress: user.email,
      verified: user.emailVerified,
    });
  });

export const onBurritoCreate = functions
  .region('europe-central2')
  .https.onCall(async (data: Data, _context) => {
    const { name, price } = data.burrito;
    const product = await stripe.products.create({
      name,
      default_price_data: {
        currency: 'usd',
        unit_amount: Math.floor(Number(price) * 100),
      },
    });
    return product;
  });
