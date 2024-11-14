import { getTextColorClasses } from "../../../../utils/Text";
import { TitleProps } from "../../../../types/components/common";

const CardTitle = ({
  children,
  className,
  color = "dark",
  ...props
}: TitleProps) => {
  return (
    <h3
      className={`text-3xl font-medium ${getTextColorClasses(color)} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export default CardTitle;
