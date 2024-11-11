// src/components/atoms/Image/Image.tsx
import styled from "@emotion/styled";
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "circle" | "rounded";
  width?: number;
  height?: number;
}

const StyledImage = styled.img<ImageProps>`
  display: block;
  max-width: 100%;
  height: auto;

  ${(props) =>
    props.variant === "circle" &&
    `
        border-radius: 50%;
    `}

  ${(props) =>
    props.variant === "rounded" &&
    `
        border-radius: 8px;
    `}
`;

/**
 * Image 컴포넌트
 *
 * @param {ImageProps} props - 컴포넌트의 props
 * @returns {JSX.Element} - 스타일이 적용된 이미지 요소
 */
const Image = ({
  src,
  alt,
  className = "",
  style = {},
  variant = "default",
  width,
  height,
}: ImageProps): JSX.Element => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      className={className}
      style={{ width, height, ...style }}
      variant={variant}
    />
  );
};

export default Image;
