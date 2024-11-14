import { BoldText } from "../../atoms/title/Title";
import Input from "../../atoms/inputs/Input";
import { InputProps } from "../../../types/components/common";

export interface LabeledInputProps extends InputProps {
  label: string;
}

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
  className,
}: LabeledInputProps) => {
  return (
    <div>
      <BoldText>{label}</BoldText>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      ></Input>
    </div>
  );
};

export default LabeledInput;
