import Stripe from 'stripe';
import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import { collection } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { toast } from 'react-toastify';

import { functions, payments, useFirestore } from '../libs/firebase';
import { Burrito, Data } from '../types/interfaces';
import { getUser } from '../pages/layout.page';

export const useBurritoCheckout = () => {
  const storage = useFirestore();

  const user = getUser();
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
    } catch (error) {
      toast.error('Something wrong happened');
    }
  };

  return {
    user,
    burrito,
    proceedToCheckout,
    isLoading: loading,
  };
};
