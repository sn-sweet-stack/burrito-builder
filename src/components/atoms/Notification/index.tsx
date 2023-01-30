import { FC } from 'react';
import { ToastContentProps } from 'react-toastify';

interface Notif extends ToastContentProps {
  title: string;
  body: string;
}

const Notification: FC<Partial<Notif>> = ({ title, body }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Notification;
