import { Link } from "react-router";

function Header() {
  return (
    <div className="tab p-0 h-[100px] w-[100%] grid grid-cols-2 items-center  bg-gradient-to-b from-[#4D0000] via-73%-[#9C0000] to-[#9C0000] z-index-2">
      <div className="flex ml-[50px]">
        <Link to={"/"}>
          <span className="header">Cocktail Crafted</span>
        </Link>
      </div>
      <div className="header-nav grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 mr-[10px] ">
        <Link to={"/"}>
          <div className="rounded-3xl hover:bg-[#4D0000] flex justify-center">HOME</div>
        </Link>
        <Link to={"/ingredient/"}>
          <div className="rounded-3xl hover:bg-[#4D0000] flex justify-center">INGREDIENTS</div>
        </Link>
        <Link to={"/favorite/"}>
          <div className="rounded-3xl hover:bg-[#4D0000] flex justify-center">FAVORITE</div>
        </Link>
      </div>
    </div>
  );
}
export default Header;
