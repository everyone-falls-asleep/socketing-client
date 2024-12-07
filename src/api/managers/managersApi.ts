import axios from "axios";
import { EventManagementResponse } from "../../types/api/managers";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "managers/events/";

const api = axios.create({
  baseURL: API_URL,
});
const fetchOneEventForManager = async (
  eventId: string,
  eventDateId: string
): Promise<EventManagementResponse> => {
  const response = await api.get<EventManagementResponse>(
    `${API_URL}${eventId}/reservation-status?eventDateId=${eventDateId}`
  );
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

export { fetchOneEventForManager };
