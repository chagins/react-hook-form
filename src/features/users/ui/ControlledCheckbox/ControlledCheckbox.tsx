import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../model";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

interface ControlledCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  options,
  label,
}: ControlledCheckboxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error?.message}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => {
              const asValue = value as string[];
              return (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  label={option.label}
                  control={
                    <Checkbox
                      checked={asValue.includes(option.id)}
                      onChange={() => {
                        if (asValue.includes(option.id)) {
                          onChange(
                            asValue.filter((item) => item !== option.id)
                          );
                        } else {
                          onChange([...value, option.id]);
                        }
                      }}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
