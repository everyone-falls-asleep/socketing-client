import axios from "axios";
import { LoginData, RegisterResponse } from "../../types/api/user";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "auth/";

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
