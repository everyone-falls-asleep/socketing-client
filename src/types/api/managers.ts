import { User } from "./user";
import { ApiResponse } from "./common";

export interface Order {
  id: string;

  user: User;

  createdAt?: string;
  deletedAt?: string;
  updatedAt?: string;
}

interface Reservation {
  id: string;
  order: Order;
}

export interface Area {
  id: string;
  label: string;
  price: number;
  svg: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  cx: number;
  cy: number;
  row: number;
  number: number;
  reservations: Reservation[];
}

export interface EventDates {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventManagement {
  id: string;
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  ticketingStartTime: string;
  createdAt?: string;
  updatedAt?: string;
  svg?: string;

  user: User;
  areas?: Area[];
  eventDates?: EventDates[];
}

export type EventManagementResponse = ApiResponse<EventManagement>;
export type AllEventManagementResponse = ApiResponse<EventManagement[]>;
