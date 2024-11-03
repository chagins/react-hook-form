import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;

export const ControlledTextField = <T extends FieldValues>({
  name,
  ...props
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          helperText={error?.message}
          error={!!error?.message}
        />
      )}
    />
  );
};
