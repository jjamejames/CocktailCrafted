function SearchForm() {
  return (
    <form className="bg-white flex flex-row w-[60%] h-[70px] mt-[25px] mb-[30px] justify-between items-center rounded-[20px] overflow-hidden hover:border-blue-400">
      <div className="w-[90%] h-auto m-[10px]">
        <input
          className="text-black w-[100%] lg:text-[36px] h-auto outline-none md:text-[20px] sm:text-[20px]"
          type="text"
          placeholder="Search for your cocktail ...."
        ></input>
      </div>
      <div>
        <button
          type="submit"
          className="w-[70px] h-[70px] bg-[#9C0000] flex justify-center items-center hover:bg-[#4d0000ef]"
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
