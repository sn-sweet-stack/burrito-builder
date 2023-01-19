import { FC } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../libs/firebase';

const SignOutButton: FC = () => {
  const [signOut, loading, error] = useSignOut(auth);

  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
