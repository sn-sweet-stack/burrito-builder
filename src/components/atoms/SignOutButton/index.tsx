import { FC } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../../libs/firebase';

const SignOutButton: FC = () => {
  const [signOut] = useSignOut(auth);

  return (
    <button
      className="self-center border border-orange-500 bg-white p-3 text-2xl font-light uppercase tracking-wide shadow-none transition duration-500 hover:shadow-[5px_5px_rgba(249,_115,_22,_0.4),_10px_10px_rgba(249,_115,_22,_0.3),_15px_15px_rgba(249,_115,_22,_0.2),_20px_20px_rgba(249,_115,_22,_0.1),_25px_25px_rgba(249,_115,_22,_0.05)]"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
