import { ColorType, FontProps } from "../types/components/common";

export const getTextColorClasses = (color: ColorType) => {
  switch (color) {
    case "primary":
      return "text-rose-400";
    case "secondary":
      return "text-gray-200";
    case "dark":
      return "text-black";
    default:
      return "text-black";
  }
};

export const getTextSizeClasses = (size: FontProps["size"]) => {
  switch (size) {
    case "text-base":
      return "text-base";
    case "text-lg5":
      return "text-5xl";
    case "text-lg4":
      return "text-4xl";
    case "text-lg3":
      return "text-3xl";
    case "text-lg2":
      return "text-2xl";
    case "text-lg1":
      return "text-xl";
    default:
      return "text-base";
  }
};

export const getFontWeightClasses = (weight: FontProps["weight"]) => {
  switch (weight) {
    case "font-base":
      return "font-base";
    case "font-medium":
      return "font-medium";
    case "font-semibold":
      return "font-semibold";
    case "font-bold":
      return "font-bold";
    case "font-extrabold":
      return "font-extrabold";
    default:
      return "text-base";
  }
};
