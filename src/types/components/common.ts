import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
} from "react";
export type ColorType = "primary" | "secondary" | "dark" | "white";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorType;
  size?: "sm" | "md" | "lg";
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  className?: string;
}

export interface LabeledInputProps extends InputProps {
  label?: string;
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

export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Contour {
  id: number;
  type: "contour" | "seat" | "area" | "polygon";
  label: string;
  path: string;
  center: { x: number; y: number };
  boundingBox: { x: number; y: number; width: number; height: number };
  points: Array<{ x: number; y: number }>;
  cx?: number; // for seat type
  cy?: number; // for seat type
  r?: number; // for seat type
  area?: number; // for seat type
  row?: number; // for seat type
  number?: number; // for seat type
}

export interface ImageSize {
  width: number;
  height: number;
}
