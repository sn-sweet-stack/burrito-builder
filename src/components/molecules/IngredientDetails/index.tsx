import { FC } from 'react';
import { BurritoIngredient } from '../../../types/interfaces';

interface Props {
  burritoIngredient: BurritoIngredient;
}

const IngredientDetails: FC<Props> = ({ burritoIngredient }) => {
  const { ingredient, quantity } = burritoIngredient;
  return (
    <li className="mx-12 flex items-center">
      <div className="flex gap-2 p-2">
        <h1 className="mb-3 text-center text-xl font-light tracking-wide">
          {ingredient.name}
        </h1>

        <p className="font-extrabold">{`$${ingredient.price}`}</p>
      </div>

      <div>
        <p className="rotate-12 bg-orange-500 px-1 text-2xl font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,1)] duration-300 hover:-rotate-12">{`x ${quantity}`}</p>
      </div>
    </li>
  );
};

export default IngredientDetails;
