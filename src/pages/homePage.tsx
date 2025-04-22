import SearchForm from "../components/searchForm/searchForm";
import RandomForm from "../components/randomForm";
import CocktailCard from "../components/cocktailCard";
import { randomAPI } from "../api";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Drink } from "../interfaces/IRandom";
import { CocktailRandomProp } from "../components/randomForm/randomForm.hook";
import { Link } from "react-router";
import { CocktailSearchProp } from "../components/searchForm/searchForm.hook";
import SearchCocktailCard from "../components/searchCocktailCard";
import { typeList } from "../utils/typeList";

export interface CocktailProps {
  data: Drink[];
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
}

function HomePage() {
  const [viewMode, setViewMode] = useState<"default" | "random" | "search">(
    "default"
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("All-Type");

  const [cocktail, setCocktail] = useState<CocktailProps>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: [],
      loading: false,
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
  const [searchCocktail, setSearchCocktail] = useState<CocktailSearchProp>(
    () => {
      const storeFavs = localStorage.getItem("favoritesCocktails");
      return {
        data: [],
        loading: true,
        error: null,
        fav: storeFavs ? JSON.parse(storeFavs) : {},
      };
    }
  );

  const handleReceiveRandomData = (randomCocktail: CocktailRandomProp) => {
    setRandomCocktail(randomCocktail); // รับข้อมูลจาก RandomForm มาเก็บใน state
    setViewMode("random");
  };

  const handleReceiveSearchData = (
    searchCocktail: CocktailSearchProp,
    keyword: string
  ) => {
    setSearchCocktail(searchCocktail);
    setSearchKeyword(keyword);
    setViewMode("search");
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
  const toggleFavoriteForSearch = (id: string) => {
    const newFav = { ...searchCocktail.fav, [id]: !searchCocktail.fav[id] };
    setSearchCocktail((prev) => ({ ...prev, fav: newFav }));
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

  const filteredCocktails = searchCocktail.data.filter((item) => {
    if (filterType === "All-Type") return true;
    return item.strCategory === filterType;
  });

  useEffect(() => {
    const abortController = new AbortController();
    callData(abortController.signal);
    return () => {
      abortController.abort();
    };
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
        <SearchForm onReceiveSearchData={handleReceiveSearchData}></SearchForm>
        <div className="text-homepage lg:text-[52px] mb-[15px] flex justify-center md:text-[36px] sm:text-[32px]">
          Click to generate a random cocktail recipe
        </div>
        <RandomForm onReceiveRandomData={handleReceiveRandomData}></RandomForm>
      </section>

      {viewMode === "default" && (
        <section className="result-home mt-8 mx-30">
          <div className="mt-20">
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
      )}
      {viewMode === "random" && randomCocktail.data && (
        <section className="random-cocktail mt-8 mx-30 mb-30 w-auto h-auto">
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
                    <div className="font mx-3 my-2 text-[24px]">
                      View Detail
                    </div>
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
                  <span className="mx-1">
                    {randomCocktail.fav?.[randomCocktail.data?.idDrink]
                      ? "❤️"
                      : "🤍"}
                  </span>
                  <span className="font mx-2 my-2 text-[24px] text-[#f2a333]">
                    {randomCocktail.fav?.[randomCocktail.data?.idDrink]
                      ? "Remove from favorites"
                      : "Save to my favorite"}
                  </span>
                  <span className="mx-1">
                    {randomCocktail.fav?.[randomCocktail.data?.idDrink]
                      ? "❤️"
                      : "🤍"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {viewMode === "search" && (
        <div>
          {searchCocktail.loading ? (
            <div className="h-[600px] flex justify-center items-center">
              <HashLoader
                color="gray"
                loading
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
              ></HashLoader>
            </div>
          ) : filteredCocktails.length > 0 ? (
            <div>
              <div className="font mx-30 mt-10 text-[28px]">
                <div className="mb-5">Search Result : {searchKeyword}</div>
                <select
                  className="font border border-gray-400 rounded-lg text-[22px] py-2 px-5 w-[300px]"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {typeList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-15 mx-30 mt-10 mb-20">
                {filteredCocktails.map((item) => (
                  <SearchCocktailCard
                    key={item.idDrink}
                    data={item}
                    isFav={searchCocktail.fav?.[item.idDrink]}
                    onToggleFav={() => toggleFavoriteForSearch(item.idDrink)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="font text-[28px] mx-30 mt-10">
              <div className="mb-5">Search Result : {searchKeyword} </div>
              <select
                className="font border border-gray-400 rounded-lg text-[22px] py-2 px-5 w-[300px]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {typeList.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <div className="bg-white h-[400px] flex justify-center">
                <h1 className="name flex justify-center items-center text-[40px] font-bold ">
                  0 Search Found From This Type
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default HomePage;
