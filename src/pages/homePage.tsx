import SearchForm from "../components/searchForm/searchForm";
import RandomForm from "../components/randomForm";

function HomePage() {
  return (
    <div>
      <section className="bg-[url(/image/cocktails.jpg)] w-[100%] h-[595px] bg-cover bg-center flex flex-col items-center text-white">
        <div className="text-homepage text-[64px] mt-[30px]">
          We Mix, You Enjoy!
        </div>
        <div className="text-homepage text-[64px] mt-[10px]">
          What's Your Mix Today?
        </div>
        <SearchForm></SearchForm>
        <div className="text-homepage text-[52px] mb-[15px]">
          Click to generate a random cocktail recipe
        </div>
        <RandomForm></RandomForm>
      </section>
      <section className="result-home">
        <span>Search Result</span>
      </section>
    </div>
  );
}
export default HomePage;
