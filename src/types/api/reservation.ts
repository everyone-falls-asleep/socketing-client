import { User } from "./user";
import { EventDate } from "./event";
import { ApiResponse } from "./common";

export interface NewReservation {
  eventId: string;
  eventDateId: string;
  seatId: string;
}
export interface Area {
  id: string;
  label: string;
  price: number;
}

export interface Seat {
  id: string;
  cx: number;
  cy: number;
  area: Area;
  row: number;
  number: number;
}

export interface Reservation {
  id: string;
  user: User;
  eventDate: EventDate;
  seat: Seat;

  created_at?: string;
  update_at?: string;
}

export type NewReservationResponse = ApiResponse<Reservation>;

export type ReservationsResponse = ApiResponse<Reservation[]>;
