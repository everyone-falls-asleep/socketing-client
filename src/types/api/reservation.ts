import { UserResponseData } from "./user";
import { EventDate, Seat } from "./event";
import { ApiResponse } from "./common";

export interface NewReservation {
  eventId: string;
  eventDateId: string;
  seatId: string;
}
export interface NewReservationResponseData {
  user: UserResponseData;
  eventDate: EventDate;
  seat: Seat;

  created_at: string;
  update_at: string;
}

export type NewReservationResponse = ApiResponse<NewReservationResponseData>;
