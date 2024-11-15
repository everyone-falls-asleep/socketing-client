import axios from "axios";
import { baseURL } from "../../constants/api";
import { EventsResponse, SingleEventResponse } from "../../types/api/event";

const API_URL = baseURL + "events/";

const api = axios.create({
  baseURL: API_URL,
});

const fetchAllEvents = async (): Promise<EventsResponse> => {
  const response = await api.get<EventsResponse>(API_URL);
  return response.data;
};

const fetchOneEvent = async (
  event_id: string
): Promise<SingleEventResponse> => {
  const response = await api.get<SingleEventResponse>(API_URL + event_id);
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

export { fetchAllEvents, fetchOneEvent };
