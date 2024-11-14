import {
  getTextColorClasses,
  getTextSizeClasses,
  getFontWeightClasses,
} from "../../../utils/Text";
import { FontProps } from "../../../types/components/common";

const Font = ({
  children,
  className,
  color = "dark",
  size,
  weight,
  ...props
}: FontProps) => {
  return (
    <p
      className={`${getTextColorClasses(color)} ${getTextSizeClasses(size)} ${getFontWeightClasses(weight)} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Font;
