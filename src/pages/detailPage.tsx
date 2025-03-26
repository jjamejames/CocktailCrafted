import { useNavigate, useParams } from "react-router";
import { searchByNameAPI } from "../api";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { CocktailType } from "../store/ListStore";
import Heart from "react-heart";

function DetailPage() {
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState<CocktailType>({
    data: [],
    loading: true,
    error: null,
  });
  const navigate = useNavigate();
  const { name } = useParams();
  const callData = async (name: string) => {
    try {
      setDetail({ data: [], loading: true, error: null });
      const res = await searchByNameAPI.getDetailByName(name);
      const drinks = res.data?.drinks || [];
      setDetail({ data: drinks, loading: false, error: null });
    } catch (error) {
      setDetail({ data: [], loading: false, error: "Failed to fetch data" });
    }
  };
  const handleButtonBack = () => {
    navigate("/");
  };
  useEffect(() => {
    if (name) {
      callData(name);
    }
  }, [name]);

  return (
    <div>
      <section className="mx-[95px] my-[30px] w-auto h-auto">
        <button
          onClick={handleButtonBack}
          className="bg-[#9C0000] rounded-xl mb-[30px] hover:cursor-pointer hover:bg-[#4D0000]"
        >
          <div className="backhome-butt my-2 mx-3 text-[24px] text-white">
            Back Home
          </div>
        </button>
        <div className="fetch-section ">
          {detail.loading && (
            <div className=" flex justify-center items-start mt-[50px]">
              <HashLoader
                color="gray"
                loading
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
              ></HashLoader>
            </div>
          )}
          {!detail.loading && (
            <div className="grid grid-cols-2  w-auto">
              <div className="img-detail flex flex-col mr-[10px]">
                <img
                  className="w-[500px] h-[500px] rounded-2xl"
                  src={detail.data[0]?.strDrinkThumb}
                ></img>
                <button
                  className="bg-[#e0e0e0] my-3 self-start w-[500px] flex justify-center items-center rounded-2xl hover:bg-[#cecccc] hover:cursor-pointer"
                  onClick={() => setActive(!active)}
                >
                  <Heart isActive={active} className="h-[28px] w-[28px]" />
                  <span className="fav-text mx-1 my-3 text-[32px] text-[#9C0000]">
                    Save to my favorite
                  </span>
                  <Heart isActive={active} className="h-[28px] w-[28px]" />
                </button>
              </div>
              <div className="detail bg-[#e0e0e0] rounded-[5%]">
                <div className="bg-[#e0e0e0]  mx-10">
                  <div className="text-[40px] mt-[10px] font-bold mb-4">
                    {detail.data[0]?.strDrink}
                  </div>
                  <hr />
                  <div className="mt-4 text-[32px] font-semibold">
                    Instruction
                  </div>
                  <div className="text-[20px] font-light">
                    {detail.data[0]?.strInstructions}
                  </div>
                  <div className="grid grid-cols-2 mt-8">
                    <div>
                      <div className="text-[28px]">Cocktail Type</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strCategory}
                      </div>
                      <div className="text-[28px]">Glass Type</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strGlass}
                      </div>
                      <div className="text-[28px]">Alcohol</div>
                      <div className="text-[18px] font-light mb-4">
                        • {detail.data[0]?.strAlcoholic}
                      </div>
                    </div>
                    <div className="ml-[20px]">
                      <div className="text-[28px]">Ingredients</div>
                      <div>• {detail.data[0]?.strIngredient1}</div>
                      {detail.data[0]?.strIngredient2 && (
                        <div>• {detail.data[0]?.strIngredient2}</div>
                      )}
                      {detail.data[0]?.strIngredient3 && (
                        <div>• {detail.data[0]?.strIngredient3}</div>
                      )}
                      {detail.data[0]?.strIngredient4 && (
                        <div>• {detail.data[0]?.strIngredient4}</div>
                      )}
                      {detail.data[0]?.strIngredient5 && (
                        <div>• {detail.data[0]?.strIngredient5}</div>
                      )}
                      {detail.data[0]?.strIngredient6 && (
                        <div>• {detail.data[0]?.strIngredient6}</div>
                      )}
                      {detail.data[0]?.strIngredient7 && (
                        <div>• {detail.data[0]?.strIngredient7}</div>
                      )}
                      {detail.data[0]?.strIngredient8 && (
                        <div>• {detail.data[0]?.strIngredient8}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="bg-[#e0e0e0] h-[500px]"></section>
    </div>
  );
}

export default DetailPage;
