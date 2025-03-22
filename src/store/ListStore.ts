import { create } from "zustand";
import { Drink } from "../interfaces/IRandom";

const CocktailStore = {
  cocktail: {
    data: [],
    loading: false,
    error: null
  },
};
export type CocktailType = {
  data: Drink[];
  loading: boolean;
  error: null 
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
