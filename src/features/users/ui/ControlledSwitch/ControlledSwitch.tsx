import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

interface ControlledSwitchProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export const ControlledSwitch = <T extends FieldValues>({
  name,
  label,
}: ControlledSwitchProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
};
