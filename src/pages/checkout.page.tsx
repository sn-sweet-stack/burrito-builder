import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import BurritoCheckout from '../components/burrito-checkout.component';

export const CheckoutPage: FC = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div>
      <BurritoCheckout />
    </div>
  );
};
