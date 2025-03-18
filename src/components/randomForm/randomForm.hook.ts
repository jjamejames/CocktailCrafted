import { useForm } from "react-hook-form";

export const useRandomForm = () => {
  const { register, watch } = useForm();
  const keyword = watch("keyword");
  return {
    fieldKeyword: register("keyword"),
  };
};
