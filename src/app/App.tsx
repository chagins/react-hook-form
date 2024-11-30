import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";
import { IFormValues } from "@/entities/form";
import { Input } from "@/features";

export const App = () => {
  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: {
      firstName: "",
    },
    mode: "onChange",
  });

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
        <Input control={control} name="firstName" rules={{ required: true }} />
        <input type="submit" />
      </form>
    </>
  );
};
