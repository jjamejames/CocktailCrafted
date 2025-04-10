import { useEffect, useState } from "react";
import { ingredientsList } from "../utils/ingredients";
import IngredientButton from "../components/ingredientButton";
import { useNavigate } from "react-router";
import { searchByIngredientsAPI } from "../api";
import { Drink } from "../interfaces/IRandom";
import { HashLoader } from "react-spinners";
import CocktailIngredientCard from "../components/cocktailIngreCard";
import { DrinkForIngredients } from "../interfaces/IIngredients";

export type cocktailTypeByIngredients = {
  data: DrinkForIngredients[];
  loading: boolean;
  error: null | string;
  fav: { [id: string]: boolean };
};

function IngredientsPage() {
  const navigate = useNavigate();
  const handleButtonBack = () => {
    navigate("/");
  };
  const [term, setTerm] = useState<string>("Rum");
  const [showMore, setShowMore] = useState<number>(9);
  const handleOnClick = (data: string) => {
    setTerm(data);
    setShowMore(9);
  };

  const [cocktailByIngredients, setCocktailByIngredients] =
    useState<cocktailTypeByIngredients>(() => {
      const storeFavs = localStorage.getItem("favoritesCocktails");
      return {
        data: [],
        loading: true,
        error: null,
        fav: storeFavs ? JSON.parse(storeFavs) : {},
      };
    });
  const toggleFavorite = (id: string) => {
    const newFav = {
      ...cocktailByIngredients.fav,
      [id]: !cocktailByIngredients.fav[id],
    };
    setCocktailByIngredients((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
  };

  const list = ingredientsList.map((item, index) => {
    return (
      <IngredientButton
        key={index}
        data={item}
        onClick={handleOnClick}
        isActive={term === item}
      ></IngredientButton>
    );
  });

  const callData = async (term: string) => {
    try {
      setCocktailByIngredients((prev) => ({ ...prev, loading: true }));
      const res = await searchByIngredientsAPI.getCocktailByIngredients(term);
      const res2 = res.data?.drinks as Drink[];
      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};
      setCocktailByIngredients({
        data: res2,
        loading: false,
        error: null,
        fav: favorites,
      });
    } catch (error) {
      setCocktailByIngredients({
        data: [],
        loading: false,
        error: "Failed to fetch data",
        fav: cocktailByIngredients.fav,
      });
    }
  };
  useEffect(() => {
    callData(term);
    window.scrollTo(0, 0);
  }, [term]);

  return (
    <div>
      <div className="flex">
        <div className="w-[273px] flex items-center flex-col bg-gradient-to-b from-[#9C0000] to-[#4D0000]">
          <div className="ingredient-text text-[36px] mb-5 mt-8 text-white">
            Ingredients
          </div>
          <div>
            {list}
            <br></br>
          </div>
        </div>
        <div className="w-[80%] mt-8 mx-20">
          <button
            onClick={handleButtonBack}
            className="bg-[#9C0000] rounded-xl mb-[30px] hover:cursor-pointer hover:bg-[#4D0000]"
          >
            <div className="backhome-butt my-2 mx-3 text-[24px] text-white">
              Back Home
            </div>
          </button>
          <div className="craft-font flex justify-center text-[48px] text-[#9C0000] mb-9">
            Crafted from {term}
          </div>
          <div>
            {cocktailByIngredients.loading && (
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
            {!cocktailByIngredients.loading && (
              <div>
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-15 ">
                  {cocktailByIngredients?.data
                    ?.slice(0, showMore)
                    ?.map((item) => {
                      return (
                        <CocktailIngredientCard
                          data={item}
                          key={item.idDrink}
                          onToggleFav={() => toggleFavorite(item.idDrink)}
                          isFav={cocktailByIngredients.fav?.[item.idDrink]}
                        ></CocktailIngredientCard>
                      );
                    })}
                </div>
                <div>
                  {showMore < cocktailByIngredients.data.length && (
                    <div className="flex justify-center mt-10">
                      <button
                        onClick={() => setShowMore((num) => num + 3)}
                        className="showmore bg-[#9C0000] text-white text-[24px] rounded-2xl hover:bg-[#4D0000] cursor-pointer"
                      >
                        <div className="my-2 mx-3">Show More</div>
                      </button>
                    </div>
                  )}
                </div>
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientsPage;
