import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

interface ControlledSliderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export const ControlledSlider = <T extends FieldValues>({
  name,
  label,
}: ControlledSliderProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" />
        </>
      )}
    />
  );
};
