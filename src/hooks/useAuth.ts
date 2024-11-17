import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { getUserInfo } from "../api/users/usersApi";
import "react-toastify/dist/ReactToastify.css";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode<{ sub: string }>(token);
      const userId = decodedToken.sub;
      if (userId) {
        setUserId(userId);
        void fetchUserInfo(userId); // 사용자 정보 불러오기
      } else {
        console.error("토큰에서 userID를 찾을 수 없습니다.");
      }
    }
  }, [setUserId]);

  const saveAuthInfo = (token: string) => {
    localStorage.setItem("authToken", token);

    const decodedToken = jwtDecode<{ sub: string }>(token);
    const userId = decodedToken.sub;

    if (userId) {
      setUserId(userId);
      void fetchUserInfo(userId); // 사용자 정보 불러오기
    } else {
      console.error("토큰에서 userID를 찾을 수 없습니다.");
    }
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const data = await getUserInfo(userId);
      const nickname = data.data?.nickname;
      if (nickname) {
        localStorage.setItem("nickname", nickname);
        toast.success(`안녕하세요, ${nickname}님!`);
        navigate("/"); // 메인 페이지로 리디렉션
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  return { isAuthenticated, saveAuthInfo };
};
