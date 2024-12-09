import axios from "axios";
import {
  GetAllOrderResponse,
  GetOneOrderResponse,
} from "../../types/api/order";
import { baseURL } from "../../constants/api";
import { ApiResponse } from "../../types/api/common";

const API_URL = baseURL + "orders/";

const api = axios.create({
  baseURL: API_URL,
});

const cancelOrder = async (orderId: string): Promise<ApiResponse<"">> => {
  const response = await api.post<ApiResponse<"">>(
    API_URL + `${orderId}/cancel`
  );
  return response.data;
};

const getAllOrder = async (eventId?: string): Promise<GetAllOrderResponse> => {
  const url = eventId ? `${API_URL}?eventId=${eventId}` : API_URL;

  const response = await api.get<GetAllOrderResponse>(url);
  return response.data;
};

const getOneOrder = async (orderId: string): Promise<GetOneOrderResponse> => {
  const response = await api.get<GetOneOrderResponse>(API_URL + orderId);
  return response.data;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error(String(error)));
  }
);

export { cancelOrder, getAllOrder, getOneOrder };
