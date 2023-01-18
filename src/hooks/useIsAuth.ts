import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../libs/firebase';

export const useIsAuth = () => {
  const auth = useAuth();
  const [user, loading, error] = useAuthState(auth);
  const isAuth = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [user]);

  return {
    isAuth,
    user,
  };
};
