import { InputProps } from "../../../types/components/common";

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} px-4 py-2 border border-gray-300 rounded-lg text-base w-full focus:outline-none focus:border-rose-400`}
    />
  );
};

export default Input;
