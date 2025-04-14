import { useEffect } from "react";
import { useRandomForm } from "./randomForm.hook";

interface RandomFormProps {
  onReceiveRandomData: (data: any, error: string | null, loading: boolean, fav: { [id: string]: boolean }) => void;
}

function RandomForm({ onReceiveRandomData }: RandomFormProps) {
  const { data, error, loading, fav, callRandomData } = useRandomForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callRandomData(); // ดึงข้อมูลเมื่อกด submit
  };

  useEffect(() => {
    if (data !== null || error !== null || loading !== null) {
      onReceiveRandomData(data, error, loading, fav); // ส่งข้อมูลกลับไปที่ HomePage
    }
  }, [data, error, loading, fav, onReceiveRandomData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="text-homepage mb-[10px] w-[200px] h-[80px] bg-[#9C0000] border-5 border-[#4D0000] text-[36px] rounded-4xl hover:bg-[#4d0000ef]"
        >
          <span>Random!</span>
        </button>
      </form>

      {/* ส่วนแสดงผล */}
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {data !== null && (
          <div className="p-4 bg-gray-100 rounded-xl">
            <h2 className="text-xl font-bold">{data.strDrink}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomForm;




import { useState, useEffect } from "react";
import SearchForm from "../components/searchForm/searchForm";
import RandomForm from "../components/randomForm";
import CocktailCard from "../components/cocktailCard";
import { HashLoader } from "react-spinners";
import { Drink } from "../interfaces/IRandom";
import { randomAPI } from "../api";

export interface CocktailProps {
  data: Drink[];
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
}

function HomePage() {
  const { data, loading, error, callRandomData } = useRandomForm();
  const [cocktail, setCocktail] = useState<CocktailProps>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: [],
      loading: true,
      error: null,
      fav: storeFavs ? JSON.parse(storeFavs) : {},
    };
  });

  const [randomCocktail, setRandomCocktail] = useState<Drink | null>(null);
  const [randomError, setRandomError] = useState<string | null>(null);
  const [randomLoading, setRandomLoading] = useState<boolean>(false);
  const [randomFav, setRandomFav] = useState<{ [id: string]: boolean }>({});

  const toggleFavorite = (id: string) => {
    const newFav = { ...cocktail.fav, [id]: !cocktail.fav[id] };
    setCocktail((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
  };

  const callData = async (signal: AbortSignal) => {
    try {
      setCocktail((prev) => ({ ...prev, loading: true }));

      const requests = Array.from({ length: 9 }, () => randomAPI.getRandom());
      const responses = await Promise.all(requests);
      const drinks = responses.flatMap((res) => res.data?.drinks || []);

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

  const handleReceiveRandomData = (data: Drink, error: string | null, loading: boolean, fav: { [id: string]: boolean }) => {
    setRandomCocktail(data);
    setRandomError(error);
    setRandomLoading(loading);
    setRandomFav(fav);
  };

  let content = (
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
  );

  // Section สำหรับข้อมูล random cocktail
  const randomContent = randomCocktail && (
    <section className="random-cocktail mt-8 mx-30">
      <div className="text-4xl font-bold mb-8">Random Cocktail: </div>
      {randomLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <HashLoader
            color="gray"
            loading
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          ></HashLoader>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-xl">
          {randomError ? (
            <p className="text-red-500">{randomError}</p>
          ) : (
            <>
              <h2 className="text-xl font-bold">{randomCocktail.strDrink}</h2>
              {/* แสดงรายละเอียดอื่นๆ ตามต้องการ */}
            </>
          )}
        </div>
      )}
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
      {randomContent} {/* แสดงข้อมูลจาก RandomForm */}
    </div>
  );
}

export default HomePage;
