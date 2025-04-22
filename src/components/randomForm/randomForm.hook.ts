import {  useState } from "react";
import { randomAPI } from "../../api";
import { Drink } from "../../interfaces/IRandom";

export interface CocktailRandomProp {
  data: Drink | null;
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
}
export const useRandomForm = () => {
  const [randomCocktail, setRandomCocktail] = useState<CocktailRandomProp>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: null,
      loading: false,
      error: null,
      fav: storeFavs ? JSON.parse(storeFavs) : {},
    };
  });
  const callRandomData = async () => {
    try {
      setRandomCocktail((prev) => ({ ...prev, loading: true }));
      const res = await randomAPI.getRandom();
      const drinks = res.data?.drinks;
      const res2 =
        Array.isArray(drinks) && drinks.length > 0 ? drinks[0] : null;
      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};
      setRandomCocktail({
        data: res2,
        loading: false,
        error: null,
        fav: favorites,
      });
    } catch {
      setRandomCocktail({
        data: null,
        loading: false,
        error: "Failed to fetch",
        fav: randomCocktail.fav,
      });
    }
  };

  return { randomCocktail, callRandomData }; // ทำให้ดึงค่าจาก hook ที่เป็น data ของ cocktail กับ callData มาใช้
};
