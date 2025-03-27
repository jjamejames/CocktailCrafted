interface IngredientButtonProp {
  data: string;
  onClick: (term: string) => void;
  isActive: boolean;
}
function IngredientButton({ data, onClick, isActive }: IngredientButtonProp) {
  const handleOnSubmit = () => {
    onClick(data);
  };
  return (
    <div className="flex flex-col">
      <button
        onClick={handleOnSubmit}
        className={`ingre-button cursor-pointer my-2 rounded-2xl border-2 px-4 py-2 text-lg
          ${
            isActive
              ? "bg-black text-white border-white"
              : "bg-[#4D0000] text-white border-[#9C0000]"
          }
        `}
      >
        {data}
      </button>
    </div>
  );
}

export default IngredientButton;
