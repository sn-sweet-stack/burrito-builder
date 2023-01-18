import { collection } from 'firebase/firestore';
import { useFirestore } from '../libs/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ingredientsConverter } from '../libs/dataConverter';

export const useIngredients = () => {
  const storage = useFirestore();
  const ingredientsRef = collection(storage, 'ingredients').withConverter(
    ingredientsConverter
  );
  const [value, loading, error] = useCollectionData(ingredientsRef);

  return {
    ingredients: value,
    loading,
    error,
  };
};
