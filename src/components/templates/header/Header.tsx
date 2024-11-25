import React, { useState, useEffect, useContext } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../organisms/auth/LoginModal";
import JoinModal from "../../organisms/auth/JoinModal";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserContext } from "../../../store/UserContext";
import AvatarIcon from "../../atoms/avatar/AvatarIcon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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

  // const handleJoinSuccess = () => {
  //   // checkLoginStatus();
  //   // checkIsManager();
  //   // setIsJoinModalOpen(false);
  // };

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
        <div className="hidden pl-10 mt-1 lg:flex md:w-[30%] lg:w-[50%] justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="공연 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-2 pl-5 pr-12 text-sm text-gray-700 rounded-full shadow-lg bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
            />
            <MagnifyingGlassIcon
              onClick={handleSearch}
              className="absolute w-5 h-5 text-gray-400 right-4 top-1/2 transform -translate-y-1/2 hover:text-gray-600 cursor-pointer"
            />
          </div>
        </div>
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="flex space-x-2 sm:w-full md:w-[70%] lg:w-[50%] items-center justify-end">
          {!isLogin ? (
            <>
              <Button variant="dark" onClick={() => setIsLoginModalOpen(true)}>
                로그인
              </Button>
              <Button variant="dark" onClick={() => setIsJoinModalOpen(true)}>
                회원가입 {/* 사실 회원가입 버튼임 */}
              </Button>
            </>
          ) : (
            <>
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-2 hover:ring-white focus:ring-offset focus:ring-offset-gray-800">
                    <AvatarIcon userId=""></AvatarIcon>
                    {/* 여기 위에 userId 연결 해주세요 by 혜다 */}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute left-2 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      onClick={openMyPage}
                      className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      마이 페이지
                    </button>
                  </MenuItem>
                  {isManager && (
                    <MenuItem>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        onClick={handleRegister}
                      >
                        공연 등록하기
                      </button>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      로그아웃
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
              <span className="text-white pr-2">
                <span className="font-bold">{name}</span>님, 안녕하세요
              </span>
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
