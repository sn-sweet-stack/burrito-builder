import { FC } from 'react';
import { BurritoIngredient } from '../hooks/useBurito';
import { Ingredient } from '../pages/burrito.page';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: BurritoIngredient) => void;
}

const IngredientItem: FC<Props> = ({ ingredient, addIngredient }) => {
  return (
    <button
      className="flex gap-1 rounded-3xl border p-1 hover:border-yellow-500"
      onClick={() =>
        addIngredient({
          ingredient,
          quantity: 1,
        })
      }
    >
      <h1>{ingredient.name}</h1>
      <p>{ingredient.price + '$'}</p>
    </button>
  );
};

export default IngredientItem;
