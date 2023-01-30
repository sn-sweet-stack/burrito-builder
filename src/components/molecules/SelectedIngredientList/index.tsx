import { FC } from 'react';

import { Burrito, BurritoIngredient } from '../../../types/interfaces';
import SelectedIngredientItem from '../../atoms/SelectIngredientItem/selected-ingredient-item.component';

interface Props {
  burrito: Burrito;
  removeIngredient: (ingredient: BurritoIngredient) => void;
  addIngredient: (Ingredient: BurritoIngredient) => void;
}

const SelectedIngredeintsList: FC<Props> = ({
  burrito,
  addIngredient,
  removeIngredient,
}) => {
  return (
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
  );
};

export default SelectedIngredeintsList;
