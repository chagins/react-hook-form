import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../model";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface ControlledRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export const ControlledRadioGroup = <T extends FieldValues>({
  name,
  options,
  label,
}: ControlledRadioGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl { ...field} error={!!error?.message}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                label={option.label}
                control={<Radio checked={field.value === option.id} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
