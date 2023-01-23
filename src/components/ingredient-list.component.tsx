import { FC } from 'react';
import { BurritoIngredient } from '../hooks/useBurito';
import { Ingredient } from '../pages/burrito.page';
import IngredientItem from './ingredient-item.component';

interface Props {
  ingredients: Ingredient[];
  addIngredient: (ingredient: BurritoIngredient) => void;
}

export const IngredientList: FC<Props> = ({ ingredients, addIngredient }) => {
  return (
    <ul className="flex max-w-[600px] flex-wrap gap-3">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <IngredientItem
            ingredient={ingredient}
            addIngredient={addIngredient}
          />
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
