import { User } from 'firebase/auth';

export interface Ingredient {
  id: string;
  name: string;
  price: number;
}

export interface OutletContext {
  user: User;
}

export interface BurritoIngredient {
  ingredient: Ingredient;
  quantity: number;
}

export interface Burrito {
  name: string;
  ingredients: BurritoIngredient[];
  price: number;
}

export interface Order {
  burrito: Burrito;
  status: string;
  userId: string;
}
