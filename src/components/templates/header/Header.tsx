import React, { useState, useEffect, useContext } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";
import LoginModal from "../../organisms/auth/LoginModal";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserContext } from "../../../store/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const { setUserId, setUserRole } = useContext(UserContext);
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
    if (role === "manager") {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    checkIsManager();
  }, []);

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
      navigate(`/search-results/${encodeURIComponent(searchQuery)}`);
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
    navigate("/");
  };

  const handleLoginSuccess = () => {
    checkLoginStatus();
    checkIsManager();
    setIsLoginModalOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const openMyPage = () => {
    navigate("/mypage");
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <HeaderLogo />
        </div>
        {/* 검색창 */}
        <div className="hidden pl-10 lg:flex md:w-[30%] lg:w-[50%] justify-center">
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
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="flex space-x-4 sm:w-full md:w-[70%] lg:w-[50%] justify-end">
          {!isLogin ? (
            <>
              <Button
                variant="primary"
                onClick={() => setIsLoginModalOpen(true)}
              >
                로그인
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-white">
                  <span className="font-bold">{name}</span>님, 안녕하세요
                </span>
                <Button variant="primary" onClick={handleLogout}>
                  로그아웃
                </Button>
                {isManager && (
                  <Button variant="primary" onClick={handleRegister}>
                    공연 등록하기
                  </Button>
                )}
                <Button variant="primary" onClick={openMyPage}>
                  마이페이지
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
