import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import Stripe from 'stripe';
import { Data } from '../cloud-functions/functions';
import { useBurritoCheckout } from '../hooks/useBurritoCheckout';
import { functions, payments } from '../libs/firebase';

const BurritoCheckout = () => {
  const { value, userLoading, loading } = useBurritoCheckout();
  const [executeCallable] = useHttpsCallable<Data, Stripe.Product>(
    functions,
    'onBurritoCreate'
  );

  if (loading || userLoading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <div>{JSON.stringify(value)}</div>
      <button
        onClick={async () => {
          try {
            if (value) {
              const product = await executeCallable({
                burrito: value[0].burrito,
              });
              if (product && product.data) {
                const session = await createCheckoutSession(payments, {
                  price: product.data.default_price as string,
                  mode: 'payment',
                });
                window.location.assign(session.url);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Create product
      </button>
    </section>
  );
};

export default BurritoCheckout;
