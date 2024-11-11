import React from "react";
import styled from "@emotion/styled";

export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  width?: string;
}

const StyledInput = styled.input<InputProps>`
  padding: 0.5em 1em;
  margin: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: ${(props) => props.width || "100%"};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  width,
}: InputProps) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
    />
  );
};

export default Input;
