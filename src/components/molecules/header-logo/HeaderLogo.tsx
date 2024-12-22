import HeaderItem from "../../atoms/header-item/HeaderItem";
import { Link } from "react-router-dom";
import { HTMLAttributes } from "react";

const HeaderLogo = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <HeaderItem className={`${className} justify-start align-items`}>
      <Link
        to="../"
        onClick={(e) => {
          e.preventDefault(); // 기본 동작 방지
          window.location.href = "/";
        }}
      >
        <div className="text-2xl font-bold">SocKeTing</div>
      </Link>
    </HeaderItem>
  );
};

export default HeaderLogo;
