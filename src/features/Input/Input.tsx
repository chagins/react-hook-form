import { IFormValues } from "@/entities/form";
import { useController, UseControllerProps } from "react-hook-form";

export const Input = (props: UseControllerProps<IFormValues>) => {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched}</p>
      <p>{fieldState.isDirty}</p>
      <p>{fieldState.invalid}</p>
    </div>
  );
};
