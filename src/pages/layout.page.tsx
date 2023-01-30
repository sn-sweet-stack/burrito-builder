import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { auth, onMessageListener } from '../libs/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Header } from '../components/header.component';
import { Notification } from '../components/notification.component';
import { OutletContext } from '../types/interfaces';
import 'react-toastify/dist/ReactToastify.css';

export const Layout: FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = (title: string, body: string) =>
    toast(<Notification title={title} body={body} />);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading]);

  onMessageListener().then((payload) => {
    if (payload.notification?.title && payload.notification?.body) {
      setNotification({
        body: payload.notification.body,
        title: payload.notification.title,
      });
    }
  });

  if (notification.title && notification.body) {
    notify(notification.title, notification.body);
  }

  if (loading) {
    return (
      <main className="bg-silver flex h-[100vh] flex-col gap-10">
        <Header />
        <Outlet context={{ user }} />
        <ToastContainer position="bottom-right" />
      </main>
    );
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
