import { useState } from 'react';
import { Ingredient } from '../pages/burrito.page';

export interface Burrito {
  name: string;
  ingredients: Ingredient[];
  price: number;
}

export const useBurrito = () => {
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

  const removeAllIngredients = () => {
    setBurrito({
      ...burrito,
      ingredients: [],
      price: 0,
    });
  };

  return {
    burrito,
    setBurritoName,
    addIngredient,
    removeIngredient,
    removeAllIngredients,
  };
};
