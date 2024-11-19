import axios from "axios";
import {
  NewReservation,
  NewReservationResponse,
  ReservationsResponse,
} from "../../types/api/reservation";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "reservations";

const api = axios.create({
  baseURL: API_URL,
});

const createNewReservation = async ({
  eventId,
  eventDateId,
  seatId,
}: NewReservation): Promise<NewReservationResponse> => {
  const response = await api.post<NewReservationResponse>(API_URL, {
    eventId,
    eventDateId,
    seatId,
  });
  return response.data;
};

const fetchOneReservation = async (
  reservation_id: string
): Promise<NewReservationResponse> => {
  const response = await api.get<NewReservationResponse>(
    API_URL + reservation_id
  );
  return response.data;
};

const fetchReservationsByEvent = async (
  event_id: string
): Promise<ReservationsResponse> => {
  const response = await api.get<ReservationsResponse>(API_URL, {
    params: {
      eventId: event_id,
    },
  });
  return response.data;
};

const fetchReservationsByUser = async (): Promise<ReservationsResponse> => {
  const response = await api.get<ReservationsResponse>(API_URL);
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
  createNewReservation,
  fetchOneReservation,
  fetchReservationsByEvent,
  fetchReservationsByUser,
};
