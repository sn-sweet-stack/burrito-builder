import { FC, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { onMessageListener } from '../libs/firebase';
import { Notification } from './notification.component';

//notifications works but im not confident in this code
export const StartTracking: FC = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = (title: string, body: string) =>
    toast(<Notification title={title} body={body} />);
  useEffect(() => {
    onMessageListener().then((payload) => {
      if (payload.notification?.title && payload.notification?.body) {
        setNotification({
          body: payload.notification.body,
          title: payload.notification.title,
        });
      }
    });
  });

  if (notification.title && notification.body) {
    notify(notification.title, notification.body);
  }
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
