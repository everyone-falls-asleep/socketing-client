import HeaderItem from "../../atoms/header-item/HeaderItem";
import { Link } from "react-router-dom";
import { HTMLAttributes } from "react";

const HeaderLogo = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <HeaderItem className={`${className} justify-start align-items`}>
      <Link to="/">
        <img
          className="h-full object-contain"
          src="https://cdn.iconscout.com/icon/free/png-256/free-ticket-113-452641.png?f=webp"
        />
      </Link>
    </HeaderItem>
  );
};

export default HeaderLogo;
