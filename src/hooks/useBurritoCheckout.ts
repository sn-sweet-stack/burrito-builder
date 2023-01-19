import { collection } from 'firebase/firestore';
import { useState } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useFirestore } from '../libs/firebase';
import { useIsAuth } from './useIsAuth';

export const useBurritoCheckout = () => {
  const { user, loading: userLoading } = useIsAuth();
  const storage = useFirestore();
  const burritoCollection = collection(
    storage,
    'users',
    user!.uid,
    'submitedBurrito'
  );
  const [value, loading, error] = useCollectionDataOnce(burritoCollection);

  return { user, value, loading, userLoading, error };
};
