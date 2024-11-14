import Input from "../../atoms/inputs/Input";
import { LabeledInputProps } from "../../../types/components/common";
import Font from "../../atoms/fonts/Font";

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
  width,
}: LabeledInputProps) => {
  return (
    <div>
      <Font className="text-left">{label}</Font>
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
