import axios from "axios";
import { UserResponse } from "../../types/api/user";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "users/";

const getUserInfo = async (user_id: string): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(API_URL + user_id);
  return response.data;
};

const getUserInfoByEmail = async (email: string): Promise<UserResponse> => {
  const modifiedEmail = email + "@jungle.com";
  const response = await axios.get<UserResponse>(
    API_URL + "email/" + modifiedEmail
  );
  return response.data;
};

const updateUserNickname = async (
  user_id: string,
  newNickname: string
): Promise<UserResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
    }
    const response = await axios.patch<UserResponse>(
      API_URL + user_id + "/nickname",
      { nickname: newNickname },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더 추가!!
        },
      }
    );
    return response.data; // 업데이트 한 사용자 정보 반환
  } catch (error) {
    console.error("Failed to update nickname:", error);
    throw error;
  }
};
export { getUserInfo, updateUserNickname, getUserInfoByEmail };