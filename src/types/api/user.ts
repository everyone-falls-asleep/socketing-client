import { ApiResponse } from "./common";

export interface LoginData {
  email: string;
  password: string;
  role?: string;
}

export interface UserPoint {
  id: string;
  point: number;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
  point?: number;
}

export type RegisterResponse = ApiResponse<User>;

export interface AuthTokenData {
  tokenType: string;
  expiresIn: string;
  accessToken: string;
}

export type LoginResponse = ApiResponse<AuthTokenData>;

export type UserResponse = ApiResponse<User>;
export type UserPointResponse = ApiResponse<UserPoint>;
