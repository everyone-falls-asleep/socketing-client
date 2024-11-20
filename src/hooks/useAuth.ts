import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { getUserInfo } from "../api/users/usersApi";
import "react-toastify/dist/ReactToastify.css";

export const useAuth = () => {
  const { setUserId } = useContext(UserContext);

  const saveAuthInfo = (token: string) => {
    localStorage.setItem("authToken", token);

    const decodedToken = jwtDecode<{ sub: string }>(token);
    const decodedUserId = decodedToken.sub;

    if (decodedUserId) {
      setUserId(decodedUserId); // userId가 변경되면 UserProvider에서 localStorage에 저장됨
      void fetchUserInfo(decodedUserId);
    } else {
      console.error("토큰에서 userID를 찾을 수 없습니다.");
    }
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const data = await getUserInfo(userId);
      // const nickname = data.data?.nickname;
      const email = data.data?.email;
      // if (nickname) {
      //   localStorage.setItem("nickname", nickname);
      //   toast.success(`안녕하세요, ${nickname}님!`);
      //   navigate("/");
      // }
      if (email) {
        const name = email.split("@")[0];
        localStorage.setItem("name", name);
        toast.success(`안녕하세요, ${name}님!`);
        // navigate("/");
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  return { saveAuthInfo };
};
