import { ApiResponse } from "./common";

export interface Event {
  id: string;
  title: string;
  eventDates: EventDate[];
  thumbnail: string;
  place: string;
  cast: string;
  age_limit: string;
  createdAt: string;
  updatedAt: string;
}

interface EventDate {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type EventResponse = ApiResponse<Event[]>;

export interface Seat {
  seat_id: string;
  x: string;
  y: string;
  area: string;
  row: string;
  number: string;
  seat_status: "0" | "1" | "2";
  event_id: string;
  date: string;
  price: string;
}

export interface Reservation {
  reservation_id: string;
  seats: Seat[];
  event: Event;
  created_at: string;
  exchange_status: "0" | "1" | "2";
}
