import React, { useState, useEffect } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";
import LoginModal from "../../organisms/auth/LoginModal";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const name = localStorage.getItem("name");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search-results/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    } else {
      alert("검색어를 입력해주세요");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    localStorage.removeItem("nickname");
    localStorage.removeItem("name");
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <HeaderLogo>
            <a href="/" className="text-2xl font-bold">
              SocKeTing
            </a>
          </HeaderLogo>
        </div>
        {/* 검색창 */}
        <div className="flex-grow hidden md:flex justify-center">
          <div className="flex items-center w-[55%] bg-white rounded-lg overflow-hidden">
            <Input
              type="text"
              placeholder="공연 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded-r-none text-gray-700 outline-none"
            />
            <button
              onClick={handleSearch}
              className="p-3 w-[100px] bg-rose-400 rounded-r-lg hover:bg-rose-500"
            >
              🔍
            </button>
          </div>
        </div>
        {!isLogin ? (
          <div className="flex space-x-4 w-[15%] justify-end">
            <Button variant="primary" onClick={() => setIsLoginModalOpen(true)}>
              로그인
            </Button>
            {/* <Button
              variant="primary"
              onClick={() => {
                navigate("/join");
              }}
            >
              회원가입
            </Button> */}
          </div>
        ) : (
          <div className="flex space-x-4 w-[15%] justify-end">
            <div className="flex items-center space-x-4">
              <span className="text-white">{name}님, 안녕하세요</span>
            </div>
            <Button variant="primary" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        )}
      </header>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
