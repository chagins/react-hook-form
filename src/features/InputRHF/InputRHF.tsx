import { IFormValues } from "@/entities/form";
import { Path, UseFormRegister } from "react-hook-form";

interface InputRHFProps {
  label: Path<IFormValues>;
  required: boolean;
  register: UseFormRegister<IFormValues>;
}

export const InputRHF = ({ label, required, register }: InputRHFProps) => {
  return (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );
};
