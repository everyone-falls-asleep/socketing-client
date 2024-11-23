import { ApiResponse } from "./common";

export interface Event {
  id: string;
  title: string;
  eventDates: EventDate[];
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  svg: string;
  createdAt?: string;
  updatedAt?: string;
  ticketingStartTime: string;
}

export interface EventDate {
  id: string;
  date: string;
  event?: Event;
  createdAt?: string;
  updatedAt?: string;
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
  ticketingStartTime: string;
}

export type NewEventResponse = ApiResponse<Event>;

export type EventDeleteResponse = ApiResponse<null>;

export interface CustomEventsProps extends Omit<Event, "ticketingStartTime"> {
  ticketingStartTime: number;
}
export interface Seat {
  id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
}

export type SeatResponse = ApiResponse<Seat[]>;

export interface NewSeat {
  event_id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
}

export type NewSeatResponse = ApiResponse<Seat>;

export interface UserSeat {
  user_id: string;
  seats: Seat[];
}
