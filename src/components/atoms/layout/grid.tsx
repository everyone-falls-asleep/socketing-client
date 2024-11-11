import { PropsWithChildren } from "react";

type StackProps = PropsWithChildren<{
  orientation?: "horizontal" | "vertical";
}>;

const Grid = ({ children, orientation = "horizontal" }: StackProps) => {
  return (
    <div
      className={`flex ${orientation === "horizontal" ? "flex-row" : "flex-col"} gap-4`}
    >
      {children}
    </div>
  );
};

export default Grid;
