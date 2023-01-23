import { getStripePayments } from '@stripe/firestore-stripe-payments';
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from 'firebase/messaging';
import {
  Auth,
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { Payload } from '../hooks/useNotification';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
});

let firestore: ReturnType<typeof getFirestore>;

export const messaging = getMessaging(firebaseApp);
getToken(messaging, {
  vapidKey:
    'BArzvbb7biSDqwBdBYwAuV6BB3tomAVrf1wzkEOHcaC8mROZsD5tDLlPs7dlmIDoKRqCkYlIHboiKlP49bDjWXc',
});

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });

export const auth = getAuth(firebaseApp);
setPersistence(auth, browserSessionPersistence);

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseApp);
  }

  return firestore;
};

export const functions = getFunctions(firebaseApp, 'europe-central2');

export const payments = getStripePayments(firebaseApp, {
  productsCollection: 'products',
  customersCollection: 'customers',
});
