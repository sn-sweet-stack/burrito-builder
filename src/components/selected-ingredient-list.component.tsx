import { FC } from 'react';
import { Burrito, BurritoIngredient } from '../types/interfaces';
import { SelectedIngredientItem } from './selected-ingredient-item.component';

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
      <ul className="flex flex-col gap-3">
        {burrito.ingredients.map((ingredient) => (
          <SelectedIngredientItem
            key={ingredient.ingredient.id}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </div>
  );
};
