import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import BurritoCheckout from '../components/burrito-checkout.component';

export const CheckoutPage: FC = () => {
  const user = useLoaderData();
  return (
    <div>
      <BurritoCheckout />
    </div>
  );
};
