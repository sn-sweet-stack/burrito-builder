import { BurritoInfo } from '../components/burrito-info.component';
import IngredientList from '../components/ingredient-list.component';
import { useBurrito } from '../hooks/useBurito';
import { useIngredients } from '../hooks/useIngredients';
import { useIsAuth } from '../hooks/useIsAuth';
import { getUser } from './layout.page';

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
    resetBurrito,
    submitBurrito,
  } = useBurrito();
  const user = getUser();
  console.log(user);
  return (
    <section className="max-w-[1200px] ">
      <div className="flex justify-between p-5">
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
          addIngredient={addIngredient}
          setBurritoName={setBurritoName}
          submitBurrito={submitBurrito}
          resetBurrito={resetBurrito}
          user={user}
        />
      </div>
    </section>
  );
};

export default BurritoPage;
