import { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useToken } from 'react-firebase-hooks/messaging';
import { useNavigate } from 'react-router-dom';
import { auth, messaging, useFirestore } from '../libs/firebase';

export const useSignIn = (path: string) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const [signInWithGoogle, credential, signInLoading, signInError] =
    useSignInWithGoogle(auth);

  const [token, tokenLoading, tokenError] = useToken(
    messaging,
    'BArzvbb7biSDqwBdBYwAuV6BB3tomAVrf1wzkEOHcaC8mROZsD5tDLlPs7dlmIDoKRqCkYlIHboiKlP49bDjWXc'
  );

  useEffect(() => {
    const db = useFirestore();
    const saveTokenToDb = async (credential: UserCredential, token: string) => {
      const docRef = doc(db, '/messagingTokens', credential.user.uid);
      await setDoc(docRef, {
        messagingToken: token,
        userId: credential.user.uid,
      });
    };
    if (credential && token) {
      saveTokenToDb(credential, token).then(() => navigate(path));
    }
  }, [credential, token]);

  useEffect(() => {
    if (tokenError || signInError) {
      setError(signInError || tokenError);
    }
    if (tokenLoading || signInLoading) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [tokenError, signInError, tokenLoading, signInLoading]);
  return {
    signInWithGoogle,
    user: credential,
    loading,
    error,
  };
};
