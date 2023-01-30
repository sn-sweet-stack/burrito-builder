import { useBurritoCheckout } from '../hooks/useBurritoCheckout';
import { BurritoDetails } from './burrito-details.component';

const BurritoCheckout = () => {
  const { burrito, proceedToCheckout } = useBurritoCheckout();



  return (
    <section className="flex flex-col">
      {burrito && <BurritoDetails burrito={burrito} />}
      <button
        className="self-center border border-orange-500 p-3 text-2xl font-light uppercase tracking-wide shadow-none transition duration-500 hover:shadow-[5px_5px_rgba(249,_115,_22,_0.4),_10px_10px_rgba(249,_115,_22,_0.3),_15px_15px_rgba(249,_115,_22,_0.2),_20px_20px_rgba(249,_115,_22,_0.1),_25px_25px_rgba(249,_115,_22,_0.05)]"
        onClick={proceedToCheckout}
      >
        Create product
      </button>
    </section>
  );
};

export default BurritoCheckout;
