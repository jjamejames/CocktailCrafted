import { Link } from "react-router";
import { Drink } from "../../interfaces/IRandom";

interface CocktailCardProp {
  data: Drink | any;
}
function CocktailCard({ data }: CocktailCardProp) {
  return (
    <div className="flex justify-center items-center mt-12 mb-10 flex-col">
      <Link to={`/detail/${data?.strDrink}`}>
      <div className="w-auto h-auto rounded-2xl overflow-hidden hover:w-[450px] hover:h-[450px]">
        <img
          className="w-auto h-auto hover:w-[450px] hover:h-[400px]"
          src={data?.strDrinkThumb}
        ></img>
        <span className="flex justify-center items-center font-bold text-[#f2a333;] text-[20px] h-[50px] w-auto bg-[#4D0000]">
          {data.strDrink}
        </span>
      </div>
      </Link>
    </div>
  );
}
export default CocktailCard;
