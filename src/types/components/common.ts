import { ButtonHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from "react";
export type ColorType = "primary" | "secondary" | "dark" | "white";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorType;
  size?: "sm" | "md" | "lg";
}

export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export interface FontProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: string | React.ReactNode;
  className?: string;
  color?: ColorType;
  size?:
    | "text-base"
    | "text-lg1"
    | "text-lg2"
    | "text-lg3"
    | "text-lg4"
    | "text-lg5";
  weight?:
    | "font-base"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold";
}

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: string | React.ReactNode;
  color?: ColorType;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: "default" | "circle" | "rounded";
}
