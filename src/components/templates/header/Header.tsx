import React, { useState } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";
import LoginModal from "../../organisms/auth/LoginModal";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const name = localStorage.getItem("name");

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

  const handleRegister = () => {
    navigate("/register");
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
        <div className="hidden md:flex md:w-[55%] lg:w-[55%] justify-center pl-4">
          <div className="flex items-center w-full bg-white rounded-lg overflow-hidden">
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
        <div className="flex space-x-4 w-[45%] md:w-[45%] lg:w-[45%] justify-end">
          {!name ? (
            <>
              <Button
                variant="primary"
                onClick={() => setIsLoginModalOpen(true)}
              >
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
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-x-2">
                <img
                  src="../../../../public/user_icon.svg"
                  height=""
                  width="24px"
                />
                <span className="text-white">{name} 님</span>
              </div>
              <div className="hidden md:block">
                <Button variant="primary" onClick={() => handleRegister()}>
                  공연 등록하기
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
