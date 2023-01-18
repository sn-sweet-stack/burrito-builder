import { FC } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useAuth } from '../../libs/firebase';

const SignOutButton: FC = () => {
  const auth = useAuth();
  const [signOut, loading, error] = useSignOut(auth);

  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
