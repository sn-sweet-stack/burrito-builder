import { createBrowserRouter } from 'react-router-dom';
import { auth } from '../libs/firebase';
import BurritoPage from '../pages/burrito.page';
import { CheckoutPage } from '../pages/checkout.page';
import { Layout } from '../pages/layout.page';
import LoginPage from '../pages/login.page';
import { TrackingPage } from '../pages/tracking.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
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
      {
        path: '/tracking',
        element: <TrackingPage />,
      },
    ],
  },
]);
