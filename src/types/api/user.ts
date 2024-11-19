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

export interface LoginResponseData {
  tokenType: string;
  expiresIn: string;
  accessToken: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface UserResponseData {
  id: string;
  nickname: string;
  email: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
  role: string;
}

export type UserResponse = ApiResponse<UserResponseData>;
