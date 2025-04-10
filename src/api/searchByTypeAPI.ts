import axios from "axios";
import { handleResponse, IResponse } from "../utils/handleResponse";
import { IngredientResponse } from "../interfaces/IIngredients";

interface IngredientsResponseProp extends IResponse {
  status: number | undefined;
  data?: IngredientResponse;
}
export const searchByTypeAPI = {
  getCocktailByType: async (type: string): Promise<IngredientsResponseProp> => {
    try {
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${type}`
      );
      return handleResponse.success(res);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
