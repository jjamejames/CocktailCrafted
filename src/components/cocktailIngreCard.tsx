import { Link } from "react-router";
import { DrinkForIngredients } from "../interfaces/IIngredients";

interface CocktailIngredientCardProp {
  data: DrinkForIngredients;
}

function CocktailIngredientCard({ data }: CocktailIngredientCardProp) {
  return (
    <div className="w-auto h-auto flex-col items-center justify-center hover:w-[90%]">
      <Link to={`/detail/${data?.strDrink}`}>
        <div className="w-auto h-auto rounded-2xl overflow-hidden">
          <img className="w-auto h-auto" src={data.strDrinkThumb}></img>
          <div className="name w-auto flex justify-center items-center text-[20px] font-bold text-[#f2a333;] bg-[#4E0000] h-[50px]">
            {data.strDrink}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CocktailIngredientCard;
