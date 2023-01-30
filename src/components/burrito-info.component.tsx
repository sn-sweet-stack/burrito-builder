import { FC } from 'react';
import { BurritoNameInput } from './burito-name-input.component';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SelectedIngredeintsList } from './selected-ingredient-list.component';
import { toast } from 'react-toastify';
import { Burrito, BurritoIngredient } from '../types/interfaces';

interface Props {
  burrito: Burrito;
  removeIngredient: (ingredient: BurritoIngredient) => void;
  addIngredient: (Ingredient: BurritoIngredient) => void;
  setBurritoName: (name: string) => void;
  submitBurrito: (burrito: Burrito, userId: string) => Promise<void>;
  resetBurrito: () => void;
  user: User | null | undefined;
}

export const BurritoInfo: FC<Props> = ({
  burrito,
  removeIngredient,
  addIngredient,
  setBurritoName,
  submitBurrito,
  resetBurrito,
  user,
}) => {
  const navigate = useNavigate();
  const handleBurritoSubmit = () => {
    if (!burrito.name) {
      toast.error('Name is required');
      return;
    }
    if (!user) {
      toast.error('Authentification error!');
      navigate('/');
    }
    if (user) {
      submitBurrito(burrito, user.uid);
    }
    resetBurrito();
    navigate('/checkout');
  };

  return (
    <div>
      <div className="mb-3 flex h-24 items-center justify-center gap-10">
        <div className="w-48">
          {burrito.name ? (
            <h1
              aria-label="Change name on double click"
              onDoubleClick={() => setBurritoName('')}
              className="text-shadow font-outline-1 bg-orange-500 p-2 text-center font-mono text-4xl font-bold text-white shadow-xl"
            >
              {burrito.name}
            </h1>
          ) : (
            <BurritoNameInput setBurritoName={setBurritoName} />
          )}
        </div>

        <button
          className="self-center border border-orange-500 bg-white p-3 text-2xl font-light uppercase tracking-wide shadow-none transition duration-500 hover:shadow-[5px_5px_rgba(249,_115,_22,_0.4),_10px_10px_rgba(249,_115,_22,_0.3),_15px_15px_rgba(249,_115,_22,_0.2),_20px_20px_rgba(249,_115,_22,_0.1),_25px_25px_rgba(249,_115,_22,_0.05)]"
          onClick={handleBurritoSubmit}
        >
          Checkout
        </button>
      </div>
      <p className="font-outline-1 text-shadow absolute right-12 bottom-0 -rotate-12 font-mono text-4xl font-bold tracking-wide text-white">
        {`Total: ${burrito.price.toFixed(2)}$`}
      </p>

      {burrito.ingredients.length > 0 && (
        <SelectedIngredeintsList
          burrito={burrito}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      )}
    </div>
  );
};
