import axios from "axios";
import { UserResponse } from "../../types/api/user";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "users/";

const getUserInfo = async (user_id: string): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(API_URL + user_id);
  return response.data;
};

export { getUserInfo };
