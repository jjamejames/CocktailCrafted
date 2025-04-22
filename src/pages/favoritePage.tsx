import { useState, useEffect } from "react";
import { CocktailProps } from "./homePage";
import { searchByIDAPI } from "../api";
import { Drink } from "../interfaces/IRandom";
import { HashLoader } from "react-spinners";
import FavCocktailCard from "../components/favCocktailCard";
import { useNavigate } from "react-router";

function FavoritePage() {
  const [favCocktails, setFavCocktails] = useState<CocktailProps>(() => {
    const storeFavs = localStorage.getItem("favoritesCocktails");
    return {
      data: [],
      loading: true,
      error: null,
      fav: storeFavs ? JSON.parse(storeFavs) : {},
    };
  });
  const navigate = useNavigate();
  const handleButtonBack = () => {
    navigate("/");
  };
  // Function ดึงข้อมูลค็อกเทลตาม ID ที่กด favorite
  const fetchFavoriteCocktails = async () => {
    try {
      setFavCocktails((prev) => ({ ...prev, loading: true }));

      const storeFavs = localStorage.getItem("favoritesCocktails");
      const favorites = storeFavs ? JSON.parse(storeFavs) : {};

      const favoriteIds = Object.keys(favorites).filter((id) => favorites[id]);

      const cocktailData = await Promise.all(
        favoriteIds.map(async (id) => {
          const res = await searchByIDAPI.getDetailByID(id);
          return res.data?.drinks[0]; // API ส่งข้อมูลมาใน drinks[]
        })
      );
      setFavCocktails((prev) => ({
        ...prev,
        data: cocktailData.filter(Boolean) as Drink[],
        loading: false,
      }));
    } catch (error) {
      setFavCocktails((prev) => ({
        ...prev,
        error: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
        loading: false,
      }));
    }
  };

  // เรียก fetch เมื่อ component โหลดครั้งแรก
  useEffect(() => {
    fetchFavoriteCocktails();
  }, []);

  const toggleFavorite = (id: string) => {
    const newFav = { ...favCocktails.fav, [id]: !favCocktails.fav[id] };
    setFavCocktails((prev) => ({ ...prev, fav: newFav }));
    localStorage.setItem("favoritesCocktails", JSON.stringify(newFav));
    fetchFavoriteCocktails(); // reload list
  };
  console.log(favCocktails.data);

  return (
    <div className="mx-[100px]">
      <button
        onClick={handleButtonBack}
        className="bg-[#9C0000] rounded-xl hover:cursor-pointer hover:bg-[#4D0000] my-10"
      >
        <div className="backhome-butt my-2 mx-3 text-[24px] text-white">
          Back Home
        </div>
      </button>
      {favCocktails.loading ? (
        <div className="h-[600px] flex justify-center items-center">
          <HashLoader
            color="gray"
            loading
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          ></HashLoader>
        </div>
      ) : favCocktails.data.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-15 mb-15">
          {favCocktails?.data?.map((cocktail) => {
            return (
              <FavCocktailCard
                data={cocktail}
                key={cocktail.idDrink}
                onToggleFav={() => toggleFavorite(cocktail.idDrink)}
                isFav={favCocktails.fav?.[cocktail.idDrink]}
              ></FavCocktailCard>
            );
          })}
        </div>
      ) : (
        <div className="bg-white h-[400px] flex justify-center">
          <h1 className="name flex justify-center items-center text-[40px] font-bold text-[#f2a333;]">
            0 favorite found
          </h1>
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
