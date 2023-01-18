import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useFirestore } from '../libs/firebase';
import { Ingredient } from '../pages/burrito.page';

export interface Burrito {
  name: string;
  ingredients: Ingredient[];
  price: number;
}

export const useBurrito = () => {
  const storage = useFirestore();
  const [burrito, setBurrito] = useState<Burrito>({
    name: '',
    ingredients: [],
    price: 0,
  });

  const addIngredient = (ingredient: Ingredient) => {
    setBurrito((prevState) => ({
      name: prevState.name,
      ingredients: [...prevState.ingredients, ingredient],
      price: prevState.price + ingredient.price,
    }));
  };

  const removeIngredient = (ingredient: Ingredient) => {
    setBurrito((prevState) => ({
      name: prevState.name,
      ingredients: prevState.ingredients.filter(
        (singleIngredient) => singleIngredient.id !== ingredient.id
      ),
      price: Math.max(prevState.price - ingredient.price, 0),
    }));
  };
  const setBurritoName = (name: string) => {
    setBurrito({
      ...burrito,
      name,
    });
  };

  const resetBurrito = () => {
    setBurrito({
      name: '',
      ingredients: [],
      price: 0,
    });
  };

  const submitBurrito = async (burrito: Burrito, userId: string) => {
    await addDoc(collection(storage, 'burritos'), {
      ...burrito,
      userId,
    });
  };

  return {
    burrito,
    setBurritoName,
    addIngredient,
    removeIngredient,
    resetBurrito,
    submitBurrito,
  };
};
