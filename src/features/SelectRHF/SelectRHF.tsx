import { IFormValues } from "@/entities/form";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectRHFProps {
  label: string;
}

export const SelectRHF = React.forwardRef<
  HTMLSelectElement,
  SelectRHFProps & ReturnType<UseFormRegister<IFormValues>>
>(({ name, label, onChange, onBlur }, ref) => {
  return (
    <>
      <label>{label}</label>
      <select
        ref={ref}
        name={name}
        onChange={(event) => void onChange(event)}
        onBlur={(event) => void onBlur(event)}
      >
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  );
});
