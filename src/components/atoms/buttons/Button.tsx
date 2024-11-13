import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const getVariantClasses = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
      case "secondary":
        return "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    }
  };

  const getSizeClasses = (size: ButtonProps["size"]) => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "lg":
        return "px-5 py-3 text-lg";
      default:
        return "px-4 py-2.5 text-base";
    }
  };

  return (
    <button
      className={`rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses(
        variant
      )} ${getSizeClasses(size)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
