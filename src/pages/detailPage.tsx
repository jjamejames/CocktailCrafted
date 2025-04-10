import {  useNavigate, useParams } from "react-router";
import { searchByNameAPI, searchByTypeAPI } from "../api";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { CocktailProps } from "./homePage";
import { DrinkForIngredients } from "../interfaces/IIngredients";

function DetailPage() {
  const [detail, setDetail] = useState<CocktailProps>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: [],
      loading: true,
      error: null,
      fav: storeFavs ? JSON.parse(storeFavs) : {},
    };
  });
  const [suggested, setSuggested] = useState<DrinkForIngredients[]>([]);
  const toggleFavorite = (id: string) => {
    const newFav = { ...detail.fav, [id]: !detail.fav[id] };
    setDetail((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
  };
  const navigate = useNavigate();
  const { name } = useParams();
  const callData = async (name: string) => {
    try {
      setDetail((prev) => ({ ...prev, loading: true }));
      const res = await searchByNameAPI.getDetailByName(name);
      const drinks = res.data?.drinks || [];
      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};
      setDetail({ data: drinks, loading: false, error: null, fav: favorites });
      if (drinks[0]?.strCategory) {
        const suggestions = await searchByTypeAPI.getCocktailByType(
          drinks[0].strCategory
        );
        const drinksSuggested = suggestions.data?.drinks || [];
        setSuggested(drinksSuggested);
      }
    } catch (error) {
      setDetail({
        data: [],
        loading: false,
        error: "Failed to fetch data",
        fav: detail.fav,
      });
    }
  };
  const handleButtonBack = () => {
    navigate("/");
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= suggested.length
        ? 0
        : prevIndex + itemsPerPage
    );
  }; // ถ้า Next แล้วเลย array → reset ไปที่ index 0
  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.max(suggested.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage
    );
  }; // ถ้า Back แล้วต่ำกว่า 0 → ไปที่ชุดสุดท้ายแทน
  useEffect(() => {
    if (name) {
      callData(name);
      window.scrollTo(0, 0);
    }
  }, [name]);

  return (
    <div>
      <section className="mx-[95px] my-[40px] w-auto h-auto">
        <button
          onClick={handleButtonBack}
          className="bg-[#9C0000] rounded-xl mb-[40px] hover:cursor-pointer hover:bg-[#4D0000]"
        >
          <div className="backhome-butt my-2 mx-3 text-[24px] text-white">
            Back Home
          </div>
        </button>
        <div className="fetch-section ">
          {detail.loading && (
            <div className=" flex justify-center items-start mt-[50px]">
              <HashLoader
                color="gray"
                loading
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
              ></HashLoader>
            </div>
          )}
          {!detail.loading && (
            <div className="grid grid-cols-2 w-auto gap-10">
              <div className="img-detail flex flex-col mr-[10px] max-w-[550px]">
                <img
                  className="w-[auto] h-[auto] rounded-2xl"
                  src={detail.data[0]?.strDrinkThumb}
                ></img>
                <div className="flex flex-col w-auto">
                  <button
                    onClick={() => toggleFavorite(detail.data[0]?.idDrink)}
                    className="bg-[#e0e0e0] text-[32px] my-3 flex justify-center items-center rounded-2xl hover:bg-[#cecccc] hover:cursor-pointer"
                  >
                    {detail.fav?.[detail.data[0]?.idDrink] ? "❤️" : "🤍"}
                    <span className="fav-text mx-3 my-3 text-[32px] text-[#9C0000]">
                      {detail.fav?.[detail.data[0]?.idDrink]
                        ? "Remove from favorites"
                        : "Save to my favorite"}
                    </span>
                    {detail.fav?.[detail.data[0]?.idDrink] ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
              <div className="detail bg-[#e0e0e0] rounded-[5%]">
                <div className="bg-[#e0e0e0]  mx-10">
                  <div className="text-[40px] mt-[10px] font-bold mb-4">
                    {detail.data[0]?.strDrink}
                  </div>
                  <hr />
                  <div className="mt-4 text-[32px] font-semibold">
                    Instruction
                  </div>
                  <div className="text-[20px] font-light">
                    {detail.data[0]?.strInstructions}
                  </div>
                  <div className="grid grid-cols-1 mt-8 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                    <div>
                      <div className="text-[28px]">Cocktail Type</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strCategory}
                      </div>
                      <div className="text-[28px]">Glass Type</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strGlass}
                      </div>
                      <div className="text-[28px]">Alcohol</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strAlcoholic}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[28px]">Ingredients</div>
                      <div>• {detail.data[0]?.strIngredient1}</div>

                      {detail.data[0]?.strIngredient2 && (
                        <div>• {detail.data[0]?.strIngredient2}</div>
                      )}
                      {detail.data[0]?.strIngredient3 && (
                        <div>• {detail.data[0]?.strIngredient3}</div>
                      )}
                      {detail.data[0]?.strIngredient4 && (
                        <div>• {detail.data[0]?.strIngredient4}</div>
                      )}
                      {detail.data[0]?.strIngredient5 && (
                        <div>• {detail.data[0]?.strIngredient5}</div>
                      )}
                      {detail.data[0]?.strIngredient6 && (
                        <div>• {detail.data[0]?.strIngredient6}</div>
                      )}
                      {detail.data[0]?.strIngredient7 && (
                        <div>• {detail.data[0]?.strIngredient7}</div>
                      )}
                      {detail.data[0]?.strIngredient8 && (
                        <div>• {detail.data[0]?.strIngredient8}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="more-like-this bg-[#e0e0e0] py-6 flex flex-col">
        <div className="more-font mx-[95px] mb-4 flex justify-between items-center">
          <h1 className="text-[24px] text-[#9C0000]">You Might Also Like</h1>
        </div>
        <div className="flex flex-row justify-between items-center mx-[95px] gap-5 mb-10">
          <button
            onClick={handleBack}
            className="bg-[#9C0000] text-white rounded-lg cursor-pointer hover:bg-[#4D0000]"
          >
            <div className="mx-2 my-1">Back</div>
          </button>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-10 overflow-hidden">
            {suggested
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item) => (
                <div
                  key={item.idDrink}
                  className="w-[auto] bg-[#4D0000] rounded-xl shadow-md hover:scale-90 cursor-pointer"
                  onClick={() => navigate(`/detail/${item.strDrink}`)}
                >
                  <img
                    src={item.strDrinkThumb}
                    className="rounded-t-xl w-full object-cover"
                  />
                  <div className="name flex justify-center items-center font-bold text-[#f2a333;] text-[25px] h-[100px] w-auto">
                    {item.strDrink}
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-[#9C0000] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#4D0000]"
          >
            <div className="mx-2 my-1">Next</div>
          </button>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
