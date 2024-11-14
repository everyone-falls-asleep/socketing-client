import { ApiResponse } from "./common";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterResponseData {
  id: string;
  nickname: string;
  email: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;
