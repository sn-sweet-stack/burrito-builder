import SignOutButton from './Auth/sign-out-button.component';

export const Header = () => {
  return (
    <header className="flex h-28 w-full items-center justify-between bg-amber-500 p-5">
      <div>
        <h1 className="text-2xl text-white">Burrito.build</h1>
      </div>
      <SignOutButton />
    </header>
  );
};
