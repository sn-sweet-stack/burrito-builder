import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../libs/firebase';

export const useSignIn = (path: string) => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      navigate(path);
    }
  }, [user]);

  return {
    signInWithGoogle,
    user,
    loading,
    error,
  };
};
