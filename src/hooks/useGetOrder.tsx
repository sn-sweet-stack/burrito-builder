import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';

import { functions, useFirestore } from '../libs/firebase';
import { getUser } from '../pages/layout.page';
import { Order } from '../types/interfaces';

export const useGetOrder = () => {
  const [docRef, setDocRef] = useState<DocumentReference<DocumentData> | null>(
    null
  );
  const user = getUser();

  const [changeDeliveryStatus] = useHttpsCallable(
    functions,
    'changeDeliveryStatus'
  );
  const [order, loading, error] = useDocumentData(docRef);

  useEffect(() => {
    if (user) {
      const storage = useFirestore();
      const document = doc(collection(storage, 'orders'), user.uid);
      setDocRef(document);
    }
  }, [user]);

  return {
    changeDeliveryStatus,
    order: order as Order,
    loading,
    error,
    user,
  };
};
