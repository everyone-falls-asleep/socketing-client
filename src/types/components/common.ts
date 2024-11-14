import { ButtonHTMLAttributes } from "react";
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
