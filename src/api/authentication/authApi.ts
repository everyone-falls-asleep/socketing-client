import axios from "axios";
import {
  LoginData,
  RegisterResponse,
  LoginResponse,
} from "../../types/api/user";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "auth/";

const sendRegisterRequest = async ({
  email,
  password,
  role,
}: LoginData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(API_URL + "register", {
    email,
    password,
    role,
  });
  return response.data;
};

const sendLoginRequest = async ({
  email,
  password,
}: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(API_URL + "login", {
    email,
    password,
  });
  return response.data;
};

export { sendRegisterRequest, sendLoginRequest };
