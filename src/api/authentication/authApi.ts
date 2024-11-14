import axios from "axios";
import { LoginData, RegisterResponse } from "../../types/api/user";
const API_URL = "https://socketing.hjyoon.me/api/auth/";

const sendRegisterRequest = async ({
  email,
  password,
}: LoginData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(API_URL + "register", {
    email,
    password,
  });
  return response.data;
};

export { sendRegisterRequest };
