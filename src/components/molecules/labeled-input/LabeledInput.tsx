import { BoldText } from "../../atoms/title/Title";
import Input, { InputProps } from "../../atoms/input/Input";

const LabeledInput = (props: InputProps) => {
  return (
    <div>
      <BoldText>Hello world!</BoldText>
      <Input value={props.value} onChange={props.onChange}></Input>
    </div>
  );
};

export default LabeledInput;
