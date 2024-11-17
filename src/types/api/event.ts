import { ApiResponse } from "./common";

export interface Event {
  id: string;
  title: string;
  eventDates: EventDate[];
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventDate {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type EventsResponse = ApiResponse<Event[]>;

export type SingleEventResponse = ApiResponse<Event>;

export interface NewEvent {
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  eventDates: string[];
  svg: string;
}

export interface NewEventResponseData {
  id: string;
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  eventDates: string[];
  svg: string;
}

export type NewEventResponse = ApiResponse<NewEventResponseData>;

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

export interface NewSeat {
  event_id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
}

export interface NewSeatResponseData {
  id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
  event: Event;
}

export type NewSeatResponse = ApiResponse<NewSeatResponseData>;

export interface Reservation {
  reservation_id: string;
  seats: Seat[];
  event: Event;
  created_at: string;
  exchange_status: "0" | "1" | "2";
}
