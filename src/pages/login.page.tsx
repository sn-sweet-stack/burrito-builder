import SignInButton from '../components/Auth/sign-in-button.component';
import burritoImg from '../assets/burrito.png';

const LoginPage = () => {
  return (
    <section className="relative flex h-[calc(100vh_-_96px)] flex-col items-center justify-center">
      <div className="z-10">
        <h1 className="font-outline-1 text-shadow mb-10 text-5xl font-extrabold tracking-wide text-white">
          Join burrito building community
        </h1>
      </div>
      <div className="z-10">
        <SignInButton />
      </div>
      <img
        src={burritoImg}
        alt="Burrito image"
        width="430px"
        height="240px"
        className="absolute right-24 z-0"
      />
    </section>
  );
};

export default LoginPage;
