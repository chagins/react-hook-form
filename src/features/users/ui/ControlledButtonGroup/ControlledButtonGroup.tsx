import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../model";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ControlledButtonGroupProps<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
}

export const ControlledButtonGroup = <T extends FieldValues>({
  name,
  options,
}: ControlledButtonGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...restField } }) => (
        <ToggleButtonGroup
          value={
            Array.isArray(value) && value.length ? value : [options?.[0].id]
          }
          onChange={(_, newValue) => {
            if (Array.isArray(newValue) && !!newValue.length) {
              onChange(newValue);
            }
          }}
          {...restField}
        >
          {options?.map((option) => (
            <ToggleButton key={option.id} value={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
};
