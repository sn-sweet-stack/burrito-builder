import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { Ingredient } from '../pages/burrito.page';

export const ingredientsConverter: FirestoreDataConverter<Ingredient> = {
  toFirestore(ingredient: WithFieldValue<Ingredient>) {
    return {
      name: ingredient.name,
      price: ingredient.price,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Ingredient {
    const ingredient = snapshot.data(options);
    return {
      id: snapshot.id,
      name: ingredient.name,
      price: ingredient.price,
    };
  },
};
