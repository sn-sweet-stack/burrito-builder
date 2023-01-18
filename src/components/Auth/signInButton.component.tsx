import { FC } from 'react';
import { useAuth } from '../../libs/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignInButton: FC = () => {
  const auth = useAuth();
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  );
};

export default SignInButton;
