import { Link } from "react-router";

function Header() {
  return (
    <div className="p-0 h-[100px] w-[100%] grid grid-cols-2 items-center  bg-gradient-to-b from-[#4D0000] via-73%-[#9C0000] to-[#9C0000] z-index-2">
      <div className="flex ml-[100px]">
        <Link to={"/"}>
          <span className="header">Cocktail Crafted</span>
        </Link>
      </div>
      <div className="header-nav flex justify-end mr-[10px]">
        <Link to={"/"}>
          <div className="rounded-3xl hover:bg-[#4D0000]">HOME</div>
        </Link>
        <Link to={"/ingredient/"}>
          <div className="rounded-3xl hover:bg-[#4D0000]">INGREDIENTS</div>
        </Link>
        <Link to={"/favorite/"}>
          <div className="rounded-3xl hover:bg-[#4D0000]">FAVORITE</div>
        </Link>
      </div>
    </div>
  );
}
export default Header;
