import axios from "axios";
import { NewOrder, NewOrderResponse } from "../../types/api/order";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "orders/";

const api = axios.create({
  baseURL: API_URL,
});

const createNewOrder = async ({
  eventId,
  eventDateId,
  seatIds,
}: NewOrder): Promise<NewOrderResponse> => {
  const response = await api.post<NewOrderResponse>(API_URL, {
    eventId,
    eventDateId,
    seatIds,
  });
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

export { createNewOrder };
