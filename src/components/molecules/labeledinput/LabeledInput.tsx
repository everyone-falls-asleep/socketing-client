import React from "react";
import Input from "../../atoms/inputs/Input";
import { LabeledInputProps } from "../../../types/components/common";
import Font from "../../atoms/fonts/Font";

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, placeholder, width, ...props }, ref) => {
    return (
      <div>
        <Font className="text-left p-1">{label}</Font>
        <Input
          ref={ref}
          placeholder={placeholder}
          width={width}
          {...props}
        ></Input>
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
