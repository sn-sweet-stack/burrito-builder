import { FC } from 'react';
import { useSignIn } from '../../hooks/useSignIn';

const SignInButton: FC = () => {
  const { signInWithGoogle, loading, error } = useSignIn('/burrito');
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInButton;
