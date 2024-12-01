import { User } from "./user";
import { EventDate, Seat } from "./event";
import { ApiResponse } from "./common";

export interface NewOrder {
  eventId: string;
  eventDateId: string;
  seatIds: string[];
}

export interface Order {
  id: string;
  orderStatus: string;
  totalAmount: string;

  user: User;
  reservations: Reservation[];

  created_at?: string;
  update_at?: string;
}

interface Reservation {
  id: string;
  eventDate: EventDate;
  seat: Seat;
}

export type NewOrderResponse = ApiResponse<Order>;
