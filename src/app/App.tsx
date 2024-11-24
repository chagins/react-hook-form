import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";
import { Inputs } from "@/entities/form";

export const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    console.log(data);
  };

  console.log(watch("example"));
  console.log({ register: register('example') });
  console.log({ register: register('exampleRequired') });
  console.log({ errors });

  return (
    <>
      <h1>RHF Get Started</h1>
      <form
        className={styles.Form}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <input defaultValue="test" {...register("example")} />
        <input {...register("exampleRequired", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </>
  );
};
