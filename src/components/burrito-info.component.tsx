import { FC } from 'react';
import { Burrito, BurritoIngredient } from '../hooks/useBurito';
import { BurritoNameInput } from './burito-name-input.component';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
      {burrito.name ? (
        <h1>{burrito.name}</h1>
      ) : (
        <BurritoNameInput setBurritoName={setBurritoName} />
      )}
      {!!burrito.ingredients.length && (
        <ul>
          {burrito.ingredients.map((ingredient) => (
            <li key={ingredient.ingredient.id} className="flex gap-3">
              <p>{ingredient.ingredient.name}</p>
              <button
                onClick={() =>
                  addIngredient({
                    ...ingredient,
                    quantity: 1,
                  })
                }
                disabled={ingredient.quantity > 4}
              >
                +
              </button>
              <p>{ingredient.quantity}</p>
              <button
                onClick={() =>
                  removeIngredient({
                    ...ingredient,
                    quantity: 1,
                  })
                }
              >
                -
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total price:{burrito.price.toFixed(2) + '$'}</p>
      <button
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
  );
};
