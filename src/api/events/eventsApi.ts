import axios from "axios";
import { baseURL } from "../../constants/api";
import { EventResponse } from "../../types/api/event";

const API_URL = baseURL + "events/";

const api = axios.create({
  baseURL: API_URL,
});

const fetchAllEvents = async (): Promise<EventResponse> => {
  const response = await api.get<EventResponse>(API_URL);
  console.log(response.data.data);
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

export { fetchAllEvents };
