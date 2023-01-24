import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import {
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { toast } from 'react-toastify';
import Stripe from 'stripe';
import { Data } from '../cloud-functions/functions';
import { functions, payments, useFirestore } from '../libs/firebase';
import { Burrito } from '../types/interfaces';
import { useIsAuth } from './useIsAuth';

export const useBurritoCheckout = () => {
  const [burritoCollection, setBurritoCollection] =
    useState<CollectionReference<DocumentData> | null>(null);
  const { user, loading: userLoading } = useIsAuth();
  const storage = useFirestore();
  const [list, loading, error] = useCollectionDataOnce(burritoCollection);
  const [executeCallable] = useHttpsCallable<Data, Stripe.Product>(
    functions,
    'onBurritoCreate'
  );
  const burrito: Burrito | undefined = list ? list[0].burrito : undefined;
  const proceedToCheckout = async () => {
    try {
      if (list) {
        // create custom burrito as product
        const product = await executeCallable({
          burrito: list[0].burrito,
        });
        if (product && product.data && user) {
          // create checkout session
          const session = await createCheckoutSession(payments, {
            price: product.data.default_price as string,
            mode: 'payment',
            success_url: 'http://localhost:5173/tracking',
          });
          const sessionUrl = session.url;

          // navigate to checkout
          window.location.assign(sessionUrl);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wrong happened');
    }
  };

  useEffect(() => {
    if (user) {
      setBurritoCollection(
        collection(storage, 'users', user!.uid, 'submitedBurrito')
      );
    }
  }, [user]);

  return { user, burrito, userLoading, proceedToCheckout };
};
