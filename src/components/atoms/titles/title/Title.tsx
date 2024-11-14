import { getTextColorClasses } from "../../../../utils/Text";
import { TitleProps } from "../../../../types/components/common";

const Title = ({
  children,
  className,
  color = "dark",
  ...props
}: TitleProps) => {
  return (
    <h1
      className={`text-5xl font-medium ${getTextColorClasses(color)} ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
