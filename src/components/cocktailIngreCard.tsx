import { Link } from "react-router";
import { DrinkForIngredients } from "../interfaces/IIngredients";

interface CocktailIngredientCardProp {
  data: DrinkForIngredients;
  onToggleFav: () => void;
  isFav: boolean;
}

function CocktailIngredientCard({
  data,
  onToggleFav,
  isFav,
}: CocktailIngredientCardProp) {
  return (
    <div className="w-auto h-auto flex-col items-center justify-center hover:w-[90%]">
      <div className="w-auto h-auto rounded-2xl overflow-hidden">
        <Link to={`/detail/${data?.strDrink}`}>
          <img className="w-auto h-auto" src={data.strDrinkThumb}></img>
        </Link>
        <div className="name w-auto flex justify-center items-center text-[22px] font-bold text-[#f2a333;] bg-[#4E0000] h-[70px]">
          {data.strDrink}
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

export default CocktailIngredientCard;
