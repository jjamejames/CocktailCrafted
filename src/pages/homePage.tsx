import SearchForm from "../components/searchForm/searchForm";
import RandomForm from "../components/randomForm";
import CocktailCard from "../components/cocktailCard";
import { randomAPI } from "../api";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Drink } from "../interfaces/IRandom";
import { CocktailRandomProp } from "../components/randomForm/randomForm.hook";
import { Link } from "react-router";

export interface CocktailProps {
  data: Drink[];
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
}

function HomePage() {
  const [cocktail, setCocktail] = useState<CocktailProps>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: [],
      loading: true,
      error: null,
      fav: storeFavs ? JSON.parse(storeFavs) : {},
    };
  });

  const [randomCocktail, setRandomCocktail] = useState<CocktailRandomProp>(
    () => {
      const storeFavs = localStorage.getItem("favoritesCocktails");
      return {
        data: null,
        loading: true,
        error: null,
        fav: storeFavs ? JSON.parse(storeFavs) : {},
      };
    }
  );

  const handleReceiveRandomData = (randomCocktail: CocktailRandomProp) => {
    setRandomCocktail({
      data: randomCocktail.data,
      loading: randomCocktail.loading,
      error: randomCocktail.error,
      fav: randomCocktail.fav,
    }); // รับข้อมูลจาก RandomForm มาเก็บใน state
  };

  const toggleFavorite = (id: string) => {
    const newFav = { ...cocktail.fav, [id]: !cocktail.fav[id] };
    setCocktail((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
  };
  const toggleFavoriteForRandom = (id: string) => {
    const newFav = { ...randomCocktail.fav, [id]: !randomCocktail.fav[id] };
    setRandomCocktail((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
  };

  const callData = async (signal: AbortSignal) => {
    try {
      setCocktail((prev) => ({ ...prev, loading: true }));

      const requests = Array.from({ length: 9 }, () => randomAPI.getRandom()); // 1st argument คือ object  array 2nd คือ mapfunction
      const responses = await Promise.all(requests);
      const drinks = responses.flatMap((res) => res.data?.drinks || []);

      // โหลด favorites จาก localStorage
      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};
      if (!signal.aborted) {
        setCocktail({
          data: drinks,
          loading: false,
          error: null,
          fav: favorites,
        });
      }
      // อัพเดต state ของ cocktails และ favorite
    } catch (error) {
      if (!signal.aborted) {
        setCocktail({
          data: [],
          loading: false,
          error: "Failed to fetch",
          fav: cocktail.fav,
        });
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    callData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  let content =
    randomCocktail.data === null ? (
      <section className="result-home mt-8 mx-30">
        <div className="text-4xl font-bold mb-8">Result : </div>
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
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-15">
              {cocktail?.data?.map((item) => {
                return (
                  <CocktailCard
                    data={item}
                    key={item.idDrink}
                    isFav={cocktail.fav?.[item.idDrink]}
                    onToggleFav={() => toggleFavorite(item.idDrink)}
                  ></CocktailCard>
                );
              })}
            </div>
          )}
        </div>
        <br />
        <br />
      </section>
    ) : null;
  let randomContent = randomCocktail.data && (
    <section className="random-cocktail mt-8 mx-30 mb-30 w-auto h-au">
      <div className="flex justify-center text-4xl font-bold mb-20 w-auto h-auto">
        Random Outcome
      </div>
      <div className="bg-[#e0e0e0] grid grid-cols-2 items-center rounded-2xl w-auto h-auto">
        <Link to={`/detail/${randomCocktail.data?.strDrink}`}>
          <img
            src={randomCocktail.data?.strDrinkThumb}
            className="w-auto h-auto max-w-[400px] max-h-[400px] my-[50px] rounded-4xl justify-self-center"
          ></img>
        </Link>
        <div className="flex flex-col justify-center ml-10">
          <div className="font mb-5 text-[40px] text-[#9C0000]">
            {randomCocktail.data?.strDrink}
          </div>
          <div className="font text-[#9C0000]">
            <p className="my-[5px] text-[24px]">
              Cocktail Type : {randomCocktail.data?.strCategory}
            </p>
            <p className="my-[5px] text-[24px]">
              Alcohol : {randomCocktail.data?.strAlcoholic}
            </p>
            <p className="my-[5px] text-[24px]">
              Glass Type : {randomCocktail.data?.strGlass}
            </p>
          </div>
          <div className="mt-5 flex items-center">
            <Link to={`/detail/${randomCocktail.data?.strDrink}`}>
              <button className="bg-[#9C0000] text-[#f2a333] rounded-2xl cursor-pointer hover:bg-[#4e0000]">
                <div className="font mx-3 my-2 text-[24px]">View Detail</div>
              </button>
            </Link>
            <button
              onClick={() => {
                if (randomCocktail.data?.idDrink) {
                  toggleFavoriteForRandom(randomCocktail.data.idDrink);
                }
              }}
              className="bg-[#9c0000] text-[24px] my-2 mx-5 flex justify-center items-center rounded-2xl hover:bg-[#4e0000] hover:cursor-pointer"
            >
              {randomCocktail.fav?.[randomCocktail.data?.idDrink] ? "❤️" : "🤍"}
              <span className="font mx-2 my-2 text-[24px] text-[#f2a333]">
                {randomCocktail.fav?.[randomCocktail.data?.idDrink]
                  ? "Remove from favorites"
                  : "Save to my favorite"}
              </span>
              {randomCocktail.fav?.[randomCocktail.data?.idDrink] ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
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
        <RandomForm onReceiveRandomData={handleReceiveRandomData}></RandomForm>
      </section>
      {content}
      {randomContent}
    </div>
  );
}
export default HomePage;
