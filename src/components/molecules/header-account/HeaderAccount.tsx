import HeaderItem from "../../atoms/header-item/HeaderItem";
import { useNavigate } from "react-router";
import Button from "../../atoms/buttons/Button";
import { HTMLAttributes } from "react";

const HeaderAccount = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  return (
    <HeaderItem className={`${className} p-3 justify-end align-items gap-2`}>
      <Button
        onClick={() => {
          void navigate("/login");
        }}
      >
        로그인
      </Button>
      <Button
        onClick={() => {
          void navigate("/join");
        }}
      >
        회원가입
      </Button>
    </HeaderItem>
  );
};

export default HeaderAccount;
