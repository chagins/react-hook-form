interface InputProps {
  label: string;
  required: boolean;
}

export const Input = ({ label, required }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input required={required} />
    </>
  );
};
