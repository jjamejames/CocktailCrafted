import { create } from "zustand";
import { Drink } from "../interfaces/IRandom";
import { DrinkForIngredients } from "../interfaces/IIngredients";

const CocktailStore = {
  cocktail: {
    data: [],
    loading: false,
    error: null,
    fav: false
  },
}
export type cocktailTypeByIngredients = {
  data: DrinkForIngredients[];
  loading: boolean;
  error: null | string
}
export type CocktailType = {
  data: Drink[];
  loading: boolean;
  error: null | string
};

type UseCocktailListStore = {
  cocktail: CocktailType;
  setCocktail: (value: CocktailType) => void;
  clearCocktail: () => void;
};
export const useCocktailListStore = create<UseCocktailListStore>((set) => ({
  ...CocktailStore,
  setCocktail: (value: CocktailType) => set({ cocktail: value }),
  clearCocktail: () => set({ ...CocktailStore }),
}));
