import axios from "axios";
import { baseURL } from "../../constants/api";
import {
  EventsResponse,
  SingleEventResponse,
  NewEvent,
  NewEventResponse,
  NewSeat,
  NewSeatResponse,
  SeatResponse,
  EventDeleteResponse,
} from "../../types/api/event";

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

const createNewEvent = async ({
  title,
  thumbnail,
  place,
  cast,
  ageLimit,
  eventDates,
  svg,
}: NewEvent): Promise<NewEventResponse> => {
  const response = await api.post<NewEventResponse>(API_URL, {
    title,
    thumbnail,
    place,
    cast,
    ageLimit,
    eventDates,
    svg,
  });
  return response.data;
};

const deleteEvent = async (event_id: string): Promise<EventDeleteResponse> => {
  const response = await api.delete<EventDeleteResponse>(`${event_id}`);
  return response.data;
};

const createNewSeat = async ({
  event_id,
  cx,
  cy,
  area,
  row,
  number,
}: NewSeat): Promise<NewSeatResponse> => {
  const response = await api.post<NewSeatResponse>(
    API_URL + event_id + "/seats",
    {
      cx,
      cy,
      area,
      row,
      number,
    }
  );
  return response.data;
};

const fetchAllSeats = async (event_id: string): Promise<SeatResponse> => {
  const response = await api.get<SeatResponse>(API_URL + event_id + "/seats");
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

export {
  fetchAllEvents,
  fetchOneEvent,
  createNewEvent,
  createNewSeat,
  fetchAllSeats,
  deleteEvent,
};
