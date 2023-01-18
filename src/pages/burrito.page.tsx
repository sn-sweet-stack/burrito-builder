import SignOutButton from '../components/Auth/signOutButton.component';
import { useIngredients } from '../hooks/useIngredients';

export interface Ingredient {
  id: string;
  name: string;
  price: number;
}

const BurritoPage = () => {
  const { ingredients, loading, error } = useIngredients();
  return (
    <section>
      <div>
        <div>
          {ingredients &&
            ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex gap-2">
                <h1>{ingredient.name}</h1>
                <p>{ingredient.price + '$'}</p>
              </div>
            ))}
        </div>
        <div></div>
      </div>
      <SignOutButton />
    </section>
  );
};

export default BurritoPage;
