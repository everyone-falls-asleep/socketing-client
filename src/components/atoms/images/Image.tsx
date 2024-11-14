import { ImageProps } from "../../../types/components/common";

const Image = ({
  src,
  alt,
  className = "",
  variant = "default",
  ...props
}: ImageProps) => {
  const getVariantClasses = (variant: ImageProps["variant"]) => {
    switch (variant) {
      case "rounded":
        return "rounded-lg";
      case "circle":
        return "rounded-full";
      default:
        return "rounded-none";
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full ${getVariantClasses(variant)} ${className}`}
      {...props}
    />
  );
};

export default Image;
