import { Link } from "react-router";
import { Drink } from "../interfaces/IRandom";

interface favCocktailCardProp {
  data: Drink;
  onToggleFav: () => void;
  isFav: boolean;
}
function FavCocktailCard({ data, onToggleFav, isFav }: favCocktailCardProp) {
  return (
    <div className="flex justify-center items-center flex-col w-auto h-auto hover:w-[90%]">
      <div className="w-auto h-auto rounded-2xl overflow-hidden bg-[#4D0000]">
        <Link to={`/detail/${data?.strDrink}`}>
          <img className="w-auto h-auto" src={data?.strDrinkThumb}></img>
        </Link>
        <div className="name flex justify-center items-center font-bold text-[#f2a333;] text-[25px] h-[100px] w-auto">
          <span className="flex justify-center">{data.strDrink}</span>
          <button
            onClick={onToggleFav}
            className={`rounded-full font-bold mx-1 hover:cursor-pointer`}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavCocktailCard;
