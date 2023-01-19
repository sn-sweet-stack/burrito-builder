import { useBurritoCheckout } from '../hooks/useBurritoCheckout';

const BurritoCheckout = () => {
  const { user, value, userLoading, loading, error } = useBurritoCheckout();
  if (loading || userLoading) {
    return <p>Loading</p>;
  }

  return <section>{JSON.stringify(value)}</section>;
};

export default BurritoCheckout;
