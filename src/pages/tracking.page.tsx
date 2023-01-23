import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { functions, useFirestore } from '../libs/firebase';
import { getUser } from './layout.page';

export const TrackingPage: FC = () => {
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

  if (!user || loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <div>{JSON.stringify(order)}</div>
      <div className="flex gap-5">
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
