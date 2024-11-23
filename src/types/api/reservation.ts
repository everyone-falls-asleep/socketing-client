import { User } from "./user";
import { EventDate, Seat } from "./event";
import { ApiResponse } from "./common";

export interface NewReservation {
  eventId: string;
  eventDateId: string;
  seatId: string;
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
