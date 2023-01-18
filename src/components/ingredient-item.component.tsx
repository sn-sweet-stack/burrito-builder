import { FC } from 'react';
import { Ingredient } from '../pages/burrito.page';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: Ingredient) => void;
}

const IngredientItem: FC<Props> = ({ ingredient, addIngredient }) => {
  return (
    <div>
      <h1>{ingredient.name}</h1>
      <p>{ingredient.price + '$'}</p>
      <button onClick={() => addIngredient(ingredient)}>+</button>
    </div>
  );
};

export default IngredientItem;
