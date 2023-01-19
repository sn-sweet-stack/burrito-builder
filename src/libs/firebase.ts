import { getStripePayments } from '@stripe/firestore-stripe-payments';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

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
