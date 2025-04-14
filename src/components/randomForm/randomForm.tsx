import { useEffect } from "react";
import { CocktailRandomProp, useRandomForm } from "./randomForm.hook";

interface RandomFormProps {
  onReceiveRandomData: (randomCocktail: CocktailRandomProp) => void; // เพิ่ม props สำหรับรับข้อมูลกลับจาก RandomForm
}
function RandomForm({ onReceiveRandomData }: RandomFormProps) {
  const { randomCocktail, callRandomData } = useRandomForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callRandomData(); // ดึงข้อมูลเมื่อกด submit
    onReceiveRandomData(randomCocktail)
  };
  useEffect(() => {
    if (randomCocktail.data !== null) {
      onReceiveRandomData(randomCocktail); // ส่งข้อมูลกลับไปที่ HomePage
      window.scrollTo(0,700)
    }
  }, [randomCocktail]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="text-homepage mb-[10px] w-[200px] h-[80px] bg-[#9C0000] border-5 border-[#4D0000] text-[36px] rounded-4xl hover:bg-[#4d0000ef]"
        >
          <span>Random!</span>
        </button>
      </form>
    </div>
  );
}

export default RandomForm;
