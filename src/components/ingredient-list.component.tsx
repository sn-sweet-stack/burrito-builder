import { FC } from 'react';
import { Ingredient, BurritoIngredient } from '../types/interfaces';
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
