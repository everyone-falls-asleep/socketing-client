// src/components/atoms/Container.tsx

import styled from "@emotion/styled";
import React from "react";
import Button from "../../atoms/buttons/Button";
import Image from "../../atoms/images/Image";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledHeader = styled.header<HeaderProps>`
  padding: 5px;
  background-color: yellow;
`;

const HeaderWrapper = styled.div<HeaderProps>``;

const Logo = styled.div<HeaderProps>``;

const Menu = styled.div<HeaderProps>``;

const MenuWrapper = styled.div<HeaderProps>``;

const UserAccountGroup = styled.div<HeaderProps>``;

const UserAccountGroupWrapper = styled.div<HeaderProps>``;

const Header = ({ className, style }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <StyledHeader className={className} style={style}>
      <HeaderWrapper className="flex justify-center items-center px-30 py-0 box-border w-full h-20 gap-5">
        <Logo className="flex justify-center items-center h-full w-1/12 p-3">
          <Link to="/">
            <Image
              width=""
              height=""
              src="https://cdn.iconscout.com/icon/free/png-256/free-ticket-113-452641.png?f=webp"
              alt="소켓팅 로고"
            ></Image>
          </Link>
        </Logo>
        <Menu className="flex justify-center items-center w-7/12 h-full p-3">
          <MenuWrapper className="w-full h-full"></MenuWrapper>
        </Menu>
        <UserAccountGroup className="flex justify-end items-center w-4/12 h-full p-3">
          <UserAccountGroupWrapper className="flex justify-end items-center gap-1 w-full h-full">
            <Button bgColor="brown">공연 등록</Button>
            <Button
              bgColor="orange"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Button>
            <Button
              bgColor="orange"
              onClick={() => {
                navigate("/join");
              }}
            >
              회원가입
            </Button>
          </UserAccountGroupWrapper>
        </UserAccountGroup>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
