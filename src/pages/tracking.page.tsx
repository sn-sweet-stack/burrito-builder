import { FC } from 'react';
import { BurritoDetails } from '../components/burrito-details.component';
import { OrderStatusBar } from '../components/order-status-bar.component';
import { useGetOrder } from '../hooks/useGetOrder';

export const TrackingPage: FC = () => {
  const { changeDeliveryStatus, order, loading, error, user } = useGetOrder();

  if (!user || loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div>
        <h1 className="ml-5 text-3xl font-extrabold">Your order:</h1>
        <div>{order && <BurritoDetails burrito={order.burrito} />}</div>
      </div>
      <div className="mb-3">
        {order && <OrderStatusBar status={order.status} />}
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
