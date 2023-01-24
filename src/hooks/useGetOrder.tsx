import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { functions, useFirestore } from '../libs/firebase';
import { getUser } from '../pages/layout.page';

export const useGetOrder = () => {
  const [docRef, setDocRef] = useState<DocumentReference<DocumentData> | null>(
    null
  );
  const user = getUser();
  const [changeDeliveryStatus] = useHttpsCallable(
    functions,
    'changeDeliveryStatus'
  );
  useEffect(() => {
    if (user) {
      const storage = useFirestore();
      setDocRef(doc(collection(storage, 'orders'), user.uid));
    }
  }, [user]);
  const [order, loading, error] = useDocumentData(docRef);

  return {
    changeDeliveryStatus,
    order,
    loading,
    error,
  };
};
