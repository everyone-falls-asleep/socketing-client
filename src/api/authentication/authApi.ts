import axios, { AxiosResponse } from "axios";
import { LoginData } from "../../types/api/user";
import { ApiResponse } from "../../types/api/common";

const API_URL = "https://socketing.hjyoon.me/api/auth/";

const sendRegisterRequest = async ({ email, password }: LoginData) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      API_URL + "register",
      {
        email,
        password,
      }
    );

    if (response.data.code === 0) {
      return "회원가입 성공!";
    } else {
      return "회원가입에 실패하였습니다";
    }
  } catch (error) {
    console.log("register error: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response.data as ApiResponse;
      const code = errorResponse.code;
      if (code === 5) {
        if (errorResponse.details?.[0].field === "email") {
          return "이메일 형식이 아닙니다.";
        } else if (errorResponse.details?.[0].field === "password") {
          return "비밀번호는 6글자 이상이어야 합니다.";
        }
      } else if (code === 1) {
        return "이미 가입된 사용자입니다.";
      } else {
        return "회원가입에 실패하였습니다.";
      }
    }
    return "회원가입에 실패하였습니다";
  }
};

export { sendRegisterRequest };
