import { HTMLAttributes } from "react";

const HeaderItem = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex ${className}`}>{children}</div>
);

export default HeaderItem;
