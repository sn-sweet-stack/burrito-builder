import { useBurrito } from '../hooks/useBurito';
import { useIngredients } from '../hooks/useIngredients';

import IngredientList from '../components/molecules/IngredientList';
import BurritoInfo from '../components/organisms/BurritoInfo';

import { getUser } from './layout.page';

const BurritoPage = () => {
  const { ingredients, isLoading, error } = useIngredients();
  const {
    burrito,
    setBurritoName,
    addIngredient,
    removeIngredient,
    resetBurritoForm,
    submitBurrito,
  } = useBurrito();
  const user = getUser();

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <section className="relative flex w-full flex-col items-center">
      <div>
        <div className="flex max-w-[1000px] justify-between gap-24 p-5">
          {ingredients ? (
            <div>
              <h2 className="font-outline-1 text-shadow mb-10 font-mono text-4xl font-bold tracking-wide text-white">
                Choose ingredients:
              </h2>

              <IngredientList
                ingredients={ingredients}
                addIngredient={addIngredient}
              />
            </div>
          ) : (
            <p>There is no ingredients available</p>
          )}
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
              resetBurritoForm={resetBurritoForm}
              user={user}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurritoPage;
