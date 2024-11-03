import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

interface ControlledDateRangePickerProps<T extends FieldValues> {
  name: Path<T>;
}

export const ControlledDateRangePicker = <T extends FieldValues>({
  name,
}: ControlledDateRangePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            {...restField}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
};
