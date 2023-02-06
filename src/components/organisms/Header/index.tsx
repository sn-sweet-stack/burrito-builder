import { Link } from 'react-router-dom';
import SignOutButton from '../../atoms/SignOutButton';

const Header = () => (
  <header className="flex h-24 w-full items-center justify-between bg-amber-500 px-5">
    <div>
      <Link to={'/'} className="relative ">
        <span className=" text-shadow text-4xl font-extrabold tracking-wide text-white">
          Burrito
        </span>

        <span className="bg-silver absolute -top-10 rotate-12 border p-1 font-bold text-white">
          build
        </span>

        <span className="bg-silver absolute top-0 h-3 w-5 -rotate-12 border"></span>

        <span className="bg-silver absolute top-5 -right-10 h-3 w-5 rotate-12 border"></span>
      </Link>
    </div>
    <SignOutButton />
  </header>
);

export default Header;
