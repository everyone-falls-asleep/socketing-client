import styled from "@emotion/styled";

interface TitleProps {
  children: string;
  textAlign?: "left" | "center" | "right" | "justify";
}
const StyledTitle = styled.h1<{ textAlign?: string }>`
  font-size: 3.5rem;
  font-weight: bold;
  color: black;
  margin: 1rem 0;
  text-align: ${(props) => props.textAlign || "left"};
`;
const Title = ({ children, textAlign = "left" }: TitleProps) => {
  return <StyledTitle style={{ textAlign }}>{children}</StyledTitle>;
};

interface SubtitleProps {
  children: string;
  textAlign?: "left" | "center" | "right" | "justify";
}
const StyledSubtitle = styled.h3<{ textAlign?: string }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  margin: 0.5rem 0;
  text-align: ${(props) => props.textAlign || "left"};
`;
const Subtitle = ({ children, textAlign = "left" }: SubtitleProps) => {
  return <StyledSubtitle style={{ textAlign }}>{children}</StyledSubtitle>;
};

interface BoldTextProps {
  children: string;
  textAlign?: "left" | "center" | "right" | "justify";
}
const BoldText = ({ children, textAlign = "left" }: BoldTextProps) => {
  return <b style={{ display: "block", textAlign }}>{children}</b>;
};

interface BodyTextProps {
  children: string;
  textAlign?: "left" | "center" | "right" | "justify";
}
const BodyText = ({ children, textAlign = "left" }: BodyTextProps) => {
  return <p style={{ textAlign }}>{children}</p>;
};

export { Title, Subtitle, BoldText, BodyText };
