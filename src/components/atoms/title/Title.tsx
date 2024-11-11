import styled from "@emotion/styled";

interface TitleProps {
  children: string;
}
const StyledTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: black;
  margin: 1rem 0;
`;
const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

interface SubtitleProps {
  children: string;
}
const StyledSubtitle = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  margin: 0.5rem 0;
`;
const Subtitle = ({ children }: SubtitleProps) => {
  return <StyledSubtitle>{children}</StyledSubtitle>;
};

interface BoldTextProps {
  children: string;
}
const BoldText = ({ children }: BoldTextProps) => {
  return <b>{children}</b>;
};

interface BodyTextProps {
  children: string;
}
const BodyText = ({ children }: BodyTextProps) => {
  return <p>{children}</p>;
};

export { Title, Subtitle, BoldText, BodyText };
