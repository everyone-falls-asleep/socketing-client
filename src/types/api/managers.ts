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
  label?: string;
  price?: number;
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
  svg: string;
  ticketingStartTime: string;
  createdAt?: string;
  updatedAt?: string;
  totalSales?: number;

  user: User;
  areas: Area[];
}

export interface AllEventManagement {
  id: string;
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  ticketingStartTime: string;
  createdAt?: string;
  updatedAt?: string;

  user: User;
  eventDates: EventDates[];
}

export type EventManagementResponse = ApiResponse<EventManagement>;
export type AllEventManagementResponse = ApiResponse<AllEventManagement[]>;
