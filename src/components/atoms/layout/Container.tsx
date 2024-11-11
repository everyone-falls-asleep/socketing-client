// src/components/atoms/Container.tsx

import styled from "@emotion/styled";
import React from "react";

export interface ContainerProps {
  width: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledContainer = styled.div<ContainerProps>`
  max-width: ${(props) => props.width};
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
`;

const Container = ({ width, children, className, style }: ContainerProps) => {
  return (
    <StyledContainer width={width} className={className} style={style}>
      {children}
    </StyledContainer>
  );
};

export default Container;
