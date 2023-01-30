import { FC } from 'react';
import { toast } from 'react-toastify';
import { useGetOrder } from '../hooks/useGetOrder';

import BurritoDetails from '../components/organisms/BurritoDetails';
import OrderStatusBar from '../components/organisms/OrderStatusBar';

type Status = 'Pending' | 'Paid' | 'Delivering' | 'Completed';

export const TrackingPage: FC = () => {
  const { changeDeliveryStatus, order, loading, error, user } = useGetOrder();
  if (!user || loading) {
    return <p>Loading</p>;
  }

  if (error) {
    toast.error('Something wrong happened!');
  }

  return (
    <div>
      <div>
        <h1 className="ml-5 text-3xl font-extrabold">Your order:</h1>
        <div>{order && <BurritoDetails burrito={order.burrito} />}</div>
      </div>
      <div className="mb-3">
        {order && <OrderStatusBar status={order.status as Status} />}
      </div>
      <div className="flex justify-center gap-5">
        <button
          onClick={() => {
            changeDeliveryStatus('Paid');
          }}
        >
          Paid
        </button>
        <button
          onClick={() => {
            changeDeliveryStatus('Delivering');
          }}
        >
          Delivering
        </button>
        <button
          onClick={() => {
            changeDeliveryStatus('Completed');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
