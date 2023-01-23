import { FC } from 'react';
import { Burrito, BurritoIngredient } from '../hooks/useBurito';
import { BurritoNameInput } from './burito-name-input.component';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SelectedIngredeintsList } from './selected-ingredient-list.component';

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
  return (
    <div>
      <div className="mb-3 flex h-24 items-center justify-center gap-2">
        <div className="w-48">
          {burrito.name ? (
            <h1
              aria-label="Change name on double click"
              onDoubleClick={() => setBurritoName('')}
            >
              {burrito.name}
            </h1>
          ) : (
            <BurritoNameInput setBurritoName={setBurritoName} />
          )}
        </div>

        <button
          className="rounded-2xl border border-amber-500 p-1"
          onClick={() => {
            if (user) {
              submitBurrito(burrito, user.uid);
            }
            resetBurrito();
            navigate('/checkout');
          }}
        >
          Checkout
        </button>
      </div>
      <p>Total price:{' ' + burrito.price.toFixed(2) + '$'}</p>
      <div>
        {!!burrito.ingredients.length && (
          <SelectedIngredeintsList
            burrito={burrito}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
          />
        )}
      </div>
    </div>
  );
};
