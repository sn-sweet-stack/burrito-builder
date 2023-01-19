import { FC } from 'react';
import BurritoCheckout from '../components/burrito-checkout.component';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { getFunctions } from 'firebase/functions';

export const CheckoutPage: FC = () => {
  return (
    <div>
      <BurritoCheckout />
    </div>
  );
};
