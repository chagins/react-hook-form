import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../model";
import {
  CheckBoxOutlineBlankSharp,
  CheckBoxOutlined,
} from "@mui/icons-material";

interface ControlledAutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export const ControlledAutocomplete = <T extends FieldValues>({
  name,
  options,
  label,
}: ControlledAutocompleteProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, ref, ...restField },
        fieldState: { error },
      }) => {
        const asValue = value as string[];
        return (
          <Autocomplete
            options={options ?? []}
            value={
              Array.isArray(asValue)
                ? asValue.map((id: string) =>
                    options?.find((item) => item.id === id)
                  )
                : []
            }
            onChange={(_, newValue) => {
              onChange(newValue.map((item) => item?.id));
            }}
            getOptionLabel={(option) =>
              options?.find((item) => item.id === option?.id)?.label ?? ""
            }
            isOptionEqualToValue={(option, newValue) =>
              option?.id === newValue?.id
            }
            renderInput={(args) => (
              <TextField
                {...args}
                label={label}
                inputRef={ref}
                error={!!error?.message}
                helperText={error?.message}
                fullWidth
              />
            )}
            renderOption={(args, option, { selected }) => (
              <Box component="li" {...args} key={option?.id}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankSharp />}
                  checkedIcon={<CheckBoxOutlined />}
                  checked={selected}
                />
                {option?.label}
              </Box>
            )}
            multiple
            disableCloseOnSelect
            {...restField}
          />
        );
      }}
    />
  );
};
