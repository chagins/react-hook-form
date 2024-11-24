interface SelectProps {
  label: string;
}

export const Select = ({ label }: SelectProps) => {
  return (
    <>
      <label>{label}</label>
      <select>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  );
};
