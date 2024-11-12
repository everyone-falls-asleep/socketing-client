import { BoldText } from "../../atoms/title/Title";
import Input, { InputProps } from "../../atoms/input/Input";

export interface LabeledInputProps extends InputProps {
  label: string;
}

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
  width,
}: LabeledInputProps) => {
  return (
    <div>
      <BoldText>{label}</BoldText>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        width={width}
      ></Input>
    </div>
  );
};

export default LabeledInput;
