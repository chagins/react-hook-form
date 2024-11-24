import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";
import { GenderEnum, Inputs } from "@/entities/form";

export const App = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    console.log(data);
  };

  return (
    <>
      <h1>RHF Get Started</h1>
      <form
        className={styles.Form}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <label>First Name</label>
        <input {...register("firstName", { required: true, maxLength: 20 })} />
        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value={GenderEnum.female}>{GenderEnum.female}</option>
          <option value={GenderEnum.male}>{GenderEnum.male}</option>
          <option value={GenderEnum.other}>{GenderEnum.other}</option>
        </select>
        <label>Age</label>
        <input
          type="number"
          {...register("age", { required: true, min: 18, max: 200 })}
        />
        <input type="submit" />
      </form>
    </>
  );
};
