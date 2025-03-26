import { Link } from "react-router";
import { Drink } from "../../interfaces/IRandom";

interface CocktailCardProp {
  data: Drink | any;
}
function CocktailCard({ data }: CocktailCardProp) {
  return (
    <div className="flex justify-center items-center flex-col w-auto h-auto sm:hover:w-[380px] sm:hover:h-[380px] md:hover:w-[200px] md:hover:h-[250px] lg:hover:w-[200px] lg:hover:h-[250px] xl:hover:w-[280px] xl:hover:h-[330px] 2xl:hover:w-[350px] 2xl:hover:h-[400px]">
      <Link to={`/detail/${data?.strDrink}`}>
        <div className="w-auto h-auto rounded-2xl overflow-hidden">
          <img className="w-auto h-auto" src={data?.strDrinkThumb}></img>
          <span className="flex justify-center items-center font-bold text-[#f2a333;] text-[20px] h-[50px] w-auto bg-[#4D0000]">
            {data.strDrink}
          </span>
        </div>
      </Link>
    </div>
  );
}
export default CocktailCard;
