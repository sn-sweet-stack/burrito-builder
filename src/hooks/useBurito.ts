import { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';

import { useFirestore } from '../libs/firebase';
import { Burrito, BurritoIngredient } from '../types/interfaces';

export const useBurrito = () => {
  const storage = useFirestore();
  const [burrito, setBurrito] = useState<Burrito>({
    name: '',
    ingredients: [],
    price: 0,
  });

  const addIngredient = (burritoIngredient: BurritoIngredient) => {
    const burritoIngredientName = burritoIngredient.ingredient.name
    const selectedIngredient = burrito.ingredients.find(
      ({ ingredient }) => ingredient.name === burritoIngredientName
    );

    if (selectedIngredient) {
      const updatedIngredient = {
        ...selectedIngredient,
        quantity: selectedIngredient.quantity + 1,
      };
      const updatedIngredientList = burrito.ingredients.map((ingr) => {
        if (ingr.ingredient.id === updatedIngredient.ingredient.id) {
          return updatedIngredient;
        }
        return ingr;
      });

      setBurrito((prevState) => ({
        name: prevState.name,
        ingredients: updatedIngredientList,
        price: updatedIngredientList.reduce(
          (acc, { ingredient, quantity}) => acc + ingredient.price * quantity,
          0
        ),
      }));
      return;
    }
    setBurrito((prevState) => ({
      name: prevState.name,
      ingredients: [...prevState.ingredients, burritoIngredient],
      price: prevState.price + burritoIngredient.ingredient.price,
    }));
    return;
  };

  const removeIngredient = (ingredient: BurritoIngredient) => {
    const selectedIngredient = burrito.ingredients.find(
      (ingr) => ingr.ingredient.name === ingredient.ingredient.name
    );
    
    if (selectedIngredient) {
      const updatedIngredientList =
        selectedIngredient.quantity > 1
          ? burrito.ingredients.map(({ ingredient, quantity }) => {
              if (ingredient.id === selectedIngredient.ingredient.id) {
                return {
                  ingredient: ingredient,
                  quantity: quantity - 1,
                };
              }
              return { ingredient, quantity } as BurritoIngredient;
            })
          : burrito.ingredients.filter(
              (ingr) => ingr.ingredient.id !== selectedIngredient.ingredient.id
            );
            
      const price = updatedIngredientList.reduce(
        (acc, { ingredient, quantity }) => acc + ingredient.price * quantity,
        0
      );
      
      setBurrito((prevState) => ({
        ...prevState,
        ingredients: updatedIngredientList,
        price,
      }));
    }
  };
  
  const setBurritoName = (name: string) => {
    setBurrito((prevState) => ({
      ...prevState,
      name,
    }));
  };

  const resetBurrito = () => {
    setBurrito({
      name: '',
      ingredients: [],
      price: 0,
    });
  };

  const submitBurrito = async (burrito: Burrito, userId: string) => {
    const burritoCollection = collection(
      storage,
      'users',
      userId,
      'submitedBurrito'
    );
    await setDoc(doc(burritoCollection, 'submited'), {
      burrito,
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
