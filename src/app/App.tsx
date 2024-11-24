import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";
import { IFormValues } from "@/entities/form";
import { Input } from "@/features/Input";
import { InputRHF } from "@/features/InputRHF";
import { Select } from "@/features/Select";
import { SelectRHF } from "@/features/SelectRHF";

export const App = () => {
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (data): void => {
    console.log(data);
  };

  return (
    <>
      <h1>RHF Get Started</h1>
      <form
        className={styles.Form}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <Input label="First Name" required />
        <InputRHF label="First Name" register={register} required />
        <Select label="Age" />
        <SelectRHF label="Age" {...register("age")} />
        <input type="submit" />
      </form>
    </>
  );
};
