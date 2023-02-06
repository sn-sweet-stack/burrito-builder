import { FC } from 'react';
import { BurritoIngredient, Ingredient } from '../../../types/interfaces';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: BurritoIngredient) => void;
}

const IngredientItem: FC<Props> = ({ ingredient, addIngredient }) => (
  <button
    className="flex gap-1 rounded-3xl border border-orange-500 p-2 font-bold shadow-md hover:border-yellow-500"
    onClick={() =>
      addIngredient({
        ingredient,
        quantity: 1,
      })
    }
    aria-label="Add ingredient"
  >
    <h1>{ingredient.name}</h1>

    <p>{ingredient.price + '$'}</p>
  </button>
);

export default IngredientItem;
