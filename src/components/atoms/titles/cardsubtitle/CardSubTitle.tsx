import { getTextColorClasses } from "../../../../utils/Text";
import { TitleProps } from "../../../../types/components/common";

const CardSubTitle = ({
  children,
  className,
  color = "dark",
  ...props
}: TitleProps) => {
  return (
    <h4
      className={`text-2xl font-medium ${getTextColorClasses(color)} ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
};

export default CardSubTitle;
