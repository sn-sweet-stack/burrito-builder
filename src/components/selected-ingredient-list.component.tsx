import { FC } from 'react';
import { Burrito, BurritoIngredient } from '../hooks/useBurito';

interface Props {
  burrito: Burrito;
  removeIngredient: (ingredient: BurritoIngredient) => void;
  addIngredient: (Ingredient: BurritoIngredient) => void;
}

export const SelectedIngredeintsList: FC<Props> = ({
  burrito,
  addIngredient,
  removeIngredient,
}) => {
  return (
    <div>
      <ul>
        {burrito.ingredients.map((ingredient) => (
          <li key={ingredient.ingredient.id} className="flex gap-3">
            <p>{ingredient.ingredient.name}</p>
            <button
              aria-label="Add ingredient"
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
              aria-label="Remove ingredient"
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
    </div>
  );
};
