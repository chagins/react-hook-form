import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";
import { IFormValues } from "@/entities/form";
import { Input } from "@mui/material";
import Select from "react-select";

export const App = () => {
  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: {
      firstName: "",
      iceCreamType: undefined,
    },
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
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => {
            console.log({ field });
            return <Input {...field} />;
          }}
        />
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
          )}
        />
        <input type="submit" />
      </form>
    </>
  );
};
