import axios from "axios";
import {
  NewReservation,
  NewReservationResponse,
} from "../../types/api/reservation";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "reservations/";

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

export { createNewReservation };
