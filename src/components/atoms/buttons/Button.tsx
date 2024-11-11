import styled from "@emotion/styled";
import React from "react";

interface ButtonProps {
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  children: React.ReactNode; // 모든 종류의 React자식 요소를 포함하는 타입
}

const StyledButton = styled.button<ButtonProps>`
  /* width: 200px;
  height: 40px; */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.bgColor || "gray"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      onClick={props.onClick}
      bgColor={props.bgColor}
      color={props.color}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
