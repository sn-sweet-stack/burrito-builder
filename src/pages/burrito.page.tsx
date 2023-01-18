import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import { useEffect } from 'react';
import SignOutButton from '../components/Auth/sign-out-button.component';
import { BurritoInfo } from '../components/burrito-info.component';
import IngredientList from '../components/ingredient-list.component';
import { useBurrito } from '../hooks/useBurito';
import { useIngredients } from '../hooks/useIngredients';
import { payments } from '../libs/firebase';

export interface Ingredient {
  id: string;
  name: string;
  price: number;
}

const BurritoPage = () => {
  const { ingredients, loading, error } = useIngredients();
  const {
    burrito,
    setBurritoName,
    addIngredient,
    removeIngredient,
    removeAllIngredients,
  } = useBurrito();

  return (
    <section>
      <div className="flex">
        <div>
          {ingredients && (
            <IngredientList
              ingredients={ingredients}
              addIngredient={addIngredient}
            />
          )}
        </div>
        <BurritoInfo
          burrito={burrito}
          removeIngredient={removeIngredient}
          setBurritoName={setBurritoName}
        />
      </div>
      <SignOutButton />
    </section>
  );
};

export default BurritoPage;
