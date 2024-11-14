import { getTextColorClasses } from "../../../../utils/Text";
import { TitleProps } from "../../../../types/components/common";

const SubTitle = ({
  children,
  className,
  color = "dark",
  ...props
}: TitleProps) => {
  return (
    <h2
      className={`text-4xl font-medium ${getTextColorClasses(color)} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SubTitle;
