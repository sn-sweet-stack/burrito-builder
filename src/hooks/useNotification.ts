import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useToken } from 'react-firebase-hooks/messaging';
import {
  useFirestore,
  onMessageListener,
  auth,
  messaging,
} from '../libs/firebase';

interface Notification {
  title: string;
  body: string;
}

export interface Payload {
  notification: Notification;
}

const useNotification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener().then((payload) => {
    if (payload.notification?.title && payload.notification?.body) {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    }
  });
};
