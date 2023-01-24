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
  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <section className="relative flex w-full flex-col items-center">
      <div>
        <div className="flex max-w-[1000px] justify-between gap-24 p-5">
          <div>
            <h2 className="font-outline-1 text-shadow mb-10 font-mono text-4xl font-bold tracking-wide text-white">
              Choose ingredients:
            </h2>
            {ingredients && (
              <IngredientList
                ingredients={ingredients}
                addIngredient={addIngredient}
              />
            )}
          </div>
          <div className="flex-grow-[50%]">
            <h2 className="text-shadow font-outline-1 mb-10 font-mono text-4xl font-bold tracking-wide text-white">
              Here is your burrito:
            </h2>
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
        </div>
      </div>
    </section>
  );
};

export default BurritoPage;
