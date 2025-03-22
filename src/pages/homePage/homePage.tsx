import SearchForm from "../../components/searchForm/searchForm";
import RandomForm from "../../components/randomForm";
import { CocktailType } from "../../store/ListStore";
import CocktailCard from "./cocktailCard";
import { randomAPI } from "../../api";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function HomePage() {
  const handleRandom = () => {};
  const [cocktail, setCocktail] = useState<CocktailType>({
    data: [],
    loading: true,
    error: null,
  });
  const abortController = new AbortController();
  const callData = async () => {
    setCocktail({ data: [], loading: true, error: null });
    const requests = Array.from({ length: 9 }, () => randomAPI.getRandom());
    const responses = await Promise.all(requests);
    const drinks = responses.flatMap((res) => res.data?.drinks || []);
    setCocktail({ data: drinks, loading: false, error: null });
  };
  useEffect(() => {
    callData();
    return abortController.abort();
  }, []);

  return (
    <div>
      <section className="bg-[url(/image/cocktails.jpg)] w-[100%] lg:h-[595px] sm:h-[500px] bg-cover bg-center flex flex-col items-center text-white">
        <div className="text-homepage lg:text-[64px] mt-[30px] w-auto flex justify-center md:text-[42px] sm:text-[42px]">
          <span>We Mix, You Enjoy!</span>
        </div>
        <div className="text-homepage lg:text-[64px] mt-[10px] flex justify-center flex-wrap md:text-[42px] sm:text-[42px]">
          What's Your Mix Today?
        </div>
        <SearchForm></SearchForm>
        <div className="text-homepage lg:text-[52px] mb-[15px] flex justify-center md:text-[36px] sm:text-[32px]">
          Click to generate a random cocktail recipe
        </div>
        <RandomForm></RandomForm>
      </section>
      <section className="result-home mt-5 mx-10">
        <span className="text-4xl font-bold">Result : </span>
        <div>
          {cocktail.loading && (
            <div className="h-[600px] flex justify-center items-center">
              <HashLoader
                color="gray"
                loading
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
              ></HashLoader>
            </div>
          )}
          {!cocktail.loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-2">
              {cocktail?.data?.map((item) => {
                return (
                  <CocktailCard data={item} key={item.idDrink}></CocktailCard>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
export default HomePage;
