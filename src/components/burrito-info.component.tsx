import { FC } from 'react';
import { Burrito } from '../hooks/useBurito';
import { Ingredient } from '../pages/burrito.page';
import { BurritoNameInput } from './burito-name-input.component';

interface Props {
  burrito: Burrito;
  removeIngredient: (ingredient: Ingredient) => void;
  setBurritoName: (name: string) => void;
}

export const BurritoInfo: FC<Props> = ({
  burrito,
  removeIngredient,
  setBurritoName,
}) => {
  return (
    <div>
      {burrito.name ? (
        <h1>{burrito.name}</h1>
      ) : (
        <BurritoNameInput setBurritoName={setBurritoName} />
      )}
      {!!burrito.ingredients.length && (
        <ul>
          {burrito.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="flex gap-3">
              <p>{ingredient.name}</p>
              <button onClick={() => removeIngredient(ingredient)}>-</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total price:{burrito.price.toFixed(2) + '$'}</p>
    </div>
  );
};
