import { useEffect } from "react";
import { CocktailSearchProp, useSearchForm } from "./searchForm.hook";

interface SearchFormProps {
  onReceiveSearchData: (
    searchCocktail: CocktailSearchProp,
    keyword: string
  ) => void;
}

function SearchForm({ onReceiveSearchData }: SearchFormProps) {
  const { callSearchData, keyword, setKeyword, searchCocktail } =
    useSearchForm();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // เมื่อ submit ให้เรียก callSearchData และส่งข้อมูลกลับไปยัง onReceiveSearchData
    if (keyword.trim() === "") {
      alert("Please Input Your Keyword");
      return;
    }
    await callSearchData(keyword);
    onReceiveSearchData(searchCocktail, keyword);
  };

  useEffect(() => {
    if (searchCocktail.data.length > 0) {
      onReceiveSearchData(searchCocktail, keyword); // ส่งข้อมูลกลับไปที่ HomePage
    }
  }, [searchCocktail, keyword]);

  useEffect(() => {
    window.scrollTo(0, 700);
  }, [searchCocktail]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex flex-row w-[60%] h-[70px] mt-[25px] mb-[30px] justify-between items-center rounded-[20px] overflow-hidden hover:border-blue-400"
    >
      <div className="w-[90%] h-auto m-[10px]">
        <input
          className="text-black w-[100%] lg:text-[36px] h-auto outline-none md:text-[20px] sm:text-[20px]"
          type="text"
          placeholder="Search for your cocktail ...."
          onChange={handleOnChange}
          value={keyword}
        ></input>
      </div>
      <div>
        <button
          type="submit"
          className="w-[70px] h-[70px] bg-[#9C0000] flex justify-center items-center hover:bg-[#4d0000ef] cursor-pointer"
        >
          <div className="w-[40px] h-[40px]">
            <img src="./image/search.png"></img>
          </div>
        </button>
      </div>
    </form>
  );
}
export default SearchForm;
