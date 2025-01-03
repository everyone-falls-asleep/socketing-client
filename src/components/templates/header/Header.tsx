import React, { useState, useEffect, useContext } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router";
import LoginModal from "../../organisms/auth/LoginModal";
import JoinModal from "../../organisms/auth/JoinModal";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserContext } from "../../../store/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const { setUserId, setUserRole, currentRole } = useContext(UserContext);
  const [isManager, setIsManager] = useState(false);

  // 로그인 상태를 체크하는 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("name");

    if (!token) {
      setIsLogin(false);
      setName("");
      return;
    }
    if (isTokenExpired(token)) {
      handleLogout();
    } else {
      if (storedName) {
        setName(storedName);
      }
      setIsLogin(true);
    }
  };

  const checkIsManager = () => {
    const role = localStorage.getItem("userRole");
    setIsManager(role === "manager");
  };

  useEffect(() => {
    checkLoginStatus();
    checkIsManager();
  }, [currentRole]);

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > exp;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      void navigate(`/search-results/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    } else {
      toast.error("검색어를 입력해주세요");
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
    setUserId(null);
    setUserRole(null);

    setIsLogin(false);
    setName("");
    toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
    void navigate("/");
  };

  const handleLoginSuccess = () => {
    checkLoginStatus();
    checkIsManager();
    setIsLoginModalOpen(false);
  };

  // const handleJoinSuccess = () => {
  //   // checkLoginStatus();
  //   // checkIsManager();
  //   // setIsJoinModalOpen(false);
  // };

  const handleRegister = () => {
    void navigate("/register");
  };

  const openMyPage = () => {
    void navigate("/mypage");
  };

  return (
    <>
      <header className="flex h-[76px] items-center justify-between pl-6 pr-4 py-4 bg-black text-white">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <HeaderLogo />
        </div>
        {/* 검색창 */}
        <div className="hidden pl-10 mt-1 lg:flex md:w-[30%] lg:w-[40%] justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="공연 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-2 pl-5 pr-12 text-sm text-gray-700 rounded-full shadow-lg bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
            />
            {/* <Button
              onClick={handleSearch}
              variant="dark"
              className="absolute right-4 top-1/2 text-sm transform -translate-y-1/2 cursor-pointer"
            ></Button> */}
          </div>
        </div>
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="flex ml-2 space-x-1 sm:w-full md:w-[70%] lg:w-[60%] items-center justify-end">
          {!isLogin ? (
            <>
              <Button
                variant="dark"
                onClick={() => setIsJoinModalOpen(true)}
                className="hidden md:inline-block"
              >
                회원가입
              </Button>
              <Button
                variant="dark"
                onClick={() => setIsJoinModalOpen(true)}
                size="sm"
                className="md:hidden text-[15px]"
              >
                회원가입
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:inline-block"
              >
                로그인
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그인
              </Button>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-white pr-2">
                <span className="font-bold">{name}</span>님, 안녕하세요
              </span>
              <Button
                onClick={handleLogout}
                variant="dark"
                className="hidden md:inline-block"
              >
                로그아웃
              </Button>

              {/* 모바일 */}
              <Button
                onClick={handleLogout}
                variant="dark"
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그아웃
              </Button>

              {isManager ? (
                <Button
                  variant="secondary"
                  onClick={handleRegister}
                  className="hidden md:inline-block"
                >
                  공연 등록하기
                </Button>
              ) : (
                <>
                  <Button
                    onClick={openMyPage}
                    variant="secondary"
                    className="hidden md:inline-block"
                  >
                    마이 페이지
                  </Button>
                  {/* 모바일 */}
                  <Button
                    onClick={openMyPage}
                    variant="secondary"
                    size="sm"
                    className="md:hidden text-[15px]"
                  >
                    마이 페이지
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </>
  );
};

export default Header;
