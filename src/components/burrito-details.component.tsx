import { FC } from 'react';
import { Burrito } from '../types/interfaces';
import { IngredientDetails } from './ingredient-details.component';

interface Props {
  burrito: Burrito;
}

export const BurritoDetails: FC<Props> = ({ burrito }) => {
  const { name, ingredients, price } = burrito;
  return (
    <article className="mx-12 mb-24 flex flex-col items-center gap-5">
      <div className="relative inline-block w-48">
        <h1 className="text-4xl font-extrabold tracking-widest">{name}</h1>
        <p className="absolute -top-3 -right-14 rotate-12 rounded-full bg-orange-500 p-1 text-xl font-bold text-white">
          {price + '$'}
        </p>
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          {ingredients.map((ingredient) => (
            <IngredientDetails
              key={ingredient.ingredient.id}
              burritoIngredient={ingredient}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};
