import { Link } from "react-router";
import { Drink } from "../interfaces/IRandom";

interface CocktailCardProp {
  data: Drink | any;
}
function CocktailCard({ data }: CocktailCardProp) {
  return (
    <div className="flex justify-center items-center flex-col w-auto h-auto hover:w-[90%]">
      <Link to={`/detail/${data?.strDrink}`}>
        <div className="w-auto h-auto rounded-2xl overflow-hidden">
          <img className="w-auto h-auto" src={data?.strDrinkThumb}></img>
          <span className="name flex justify-center items-center font-bold text-[#f2a333;] text-[20px] h-[50px] w-auto bg-[#4D0000]">
            {data.strDrink}
          </span>
        </div>
      </Link>
    </div>
  );
}
export default CocktailCard;
