import { useBurritoCheckout } from '../hooks/useBurritoCheckout';

const BurritoCheckout = () => {
  const { burrito, userLoading, proceedToCheckout } = useBurritoCheckout();

  if (userLoading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <div>{JSON.stringify(burrito)}</div>
      <button onClick={proceedToCheckout}>Create product</button>
    </section>
  );
};

export default BurritoCheckout;
