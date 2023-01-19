import { createBrowserRouter } from 'react-router-dom';
import BurritoPage from '../pages/burrito.page';
import { CheckoutPage } from '../pages/checkout.page';
import LoginPage from '../pages/login.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/burrito',
    element: <BurritoPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
]);
