import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import { collection } from 'firebase/firestore';
import { useState } from 'react';

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import Stripe from 'stripe';
import { Data } from '../cloud-functions/functions';
import { functions, payments, useFirestore } from '../libs/firebase';
import { Burrito } from './useBurito';
import { useIsAuth } from './useIsAuth';

// under construction (Problems with page load consistency and auth data )
export const useBurritoCheckout = () => {
  const { user, loading: userLoading } = useIsAuth();
  const storage = useFirestore();

  const burritoCollection = collection(
    storage,
    'users',
    user!.uid,
    'submitedBurrito'
  );
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
    } catch (e) {
      console.log(e);
    }
  };

  return { user, burrito, userLoading, proceedToCheckout };
};
