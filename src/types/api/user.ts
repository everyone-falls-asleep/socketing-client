import { ApiResponse } from "./common";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
  // role 필드 추가 예정
}

export type RegisterResponse = ApiResponse<User>;

export interface AuthTokenData {
  tokenType: string;
  expiresIn: string;
  accessToken: string;
}

export type LoginResponse = ApiResponse<AuthTokenData>;

export type UserResponse = ApiResponse<User>;
