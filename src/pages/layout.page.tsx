import { FC, useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from '../components/header.component';
import { auth, onMessageListener } from '../libs/firebase';
import { Notification } from '../components/notification.component';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';

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
    <main className="flex flex-col gap-10">
      <Header />
      <Outlet context={{ user }} />
      <ToastContainer position="bottom-right" />
    </main>
  );
};

interface OutletContext {
  user: User;
}

export const getUser = () => {
  const { user } = useOutletContext<OutletContext>();

  return user;
};
