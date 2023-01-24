import { FC, useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from '../components/header.component';
import { auth, onMessageListener } from '../libs/firebase';
import { Notification } from '../components/notification.component';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OutletContext } from '../types/interfaces';

export const Layout: FC = () => {
  const [user, loading] = useAuthState(auth);
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
    <main className="bg-silver flex h-[100vh] flex-col gap-10">
      <Header />
      <Outlet context={{ user }} />
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export const getUser = () => {
  const { user } = useOutletContext<OutletContext>();

  return user;
};
