import axios from "axios";
import { handleResponse, IResponse } from "../utils/handleResponse";
import { DetailResponse } from "../interfaces/IRandom";

interface IDetailResponse extends IResponse {
  status: number | undefined;
  data?: DetailResponse;
}

export const searchByNameAPI = {
  getDetailByName: async (name: string):Promise<IDetailResponse> => {
    try {
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      return handleResponse.success(res);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
