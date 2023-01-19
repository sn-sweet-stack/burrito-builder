import { FC } from 'react';
import { BurritoIngredient } from '../hooks/useBurito';
import { Ingredient } from '../pages/burrito.page';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: BurritoIngredient) => void;
}

const IngredientItem: FC<Props> = ({ ingredient, addIngredient }) => {
  return (
    <div>
      <h1>{ingredient.name}</h1>
      <p>{ingredient.price + '$'}</p>
      <button
        onClick={() =>
          addIngredient({
            ingredient,
            quantity: 1,
          })
        }
      >
        +
      </button>
    </div>
  );
};

export default IngredientItem;
