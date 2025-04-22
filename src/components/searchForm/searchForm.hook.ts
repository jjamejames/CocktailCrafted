import { useState } from "react";
import { Drink } from "../../interfaces/IRandom";
import { searchByNameAPI } from "../../api";

export interface CocktailSearchProp {
  data: Drink[];
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
}

export const useSearchForm = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchCocktail, setSearchCocktail] = useState<CocktailSearchProp>(
    () => {
      const storeFavs = localStorage.getItem("favoritesCocktails");
      return {
        data: [],
        loading: false,
        error: null,
        fav: storeFavs ? JSON.parse(storeFavs) : {},
      };
    }
  );
  const callSearchData = async (keyword: string) => {
    try {
      setSearchCocktail((prev) => ({ ...prev, loading: true }));
      const res = await searchByNameAPI.getDetailByName(keyword);
      const res2: Drink[] = res.data?.drinks || [];
      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};
      setSearchCocktail({
        data: res2,
        loading: false,
        error: null,
        fav: favorites,
      });
    } catch (error) {
      setSearchCocktail((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch data",
      }));
    }
  };
  return {
    callSearchData,
    keyword,
    setKeyword,
    searchCocktail,
  };
};
