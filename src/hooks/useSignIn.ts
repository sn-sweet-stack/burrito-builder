import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../libs/firebase';

export const useSignIn = (path: string) => {
  const auth = useAuth();
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
