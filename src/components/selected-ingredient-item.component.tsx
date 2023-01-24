import { FC } from 'react';
import { BurritoIngredient } from '../types/interfaces';

interface Props {
  ingredient: BurritoIngredient;
  removeIngredient: (ingredient: BurritoIngredient) => void;
  addIngredient: (Ingredient: BurritoIngredient) => void;
}

export const SelectedIngredientItem: FC<Props> = ({
  ingredient,
  addIngredient,
  removeIngredient,
}) => {
  return (
    <li className="flex gap-3 font-mono text-xl">
      <p>{ingredient.ingredient.name}</p>
      <button
        aria-label="Remove ingredient"
        className="font-outline-1 rounded-[50%] border bg-orange-500 px-2 text-white duration-300 hover:border-orange-800"
        onClick={() =>
          removeIngredient({
            ...ingredient,
            quantity: 1,
          })
        }
      >
        -
      </button>
      <p>{ingredient.quantity}</p>
      <button
        className="font-outline-1 rounded-[50%] border bg-orange-500 px-2 text-white duration-300 hover:border-orange-800"
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
    </li>
  );
};
