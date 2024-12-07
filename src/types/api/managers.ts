import { User } from "./user";
import { ApiResponse } from "./common";
import { Payment } from "./payment";

export interface Order {
  id: string;

  payments: Payment[];

  createdAt?: string;
  deletedAt?: string;
}

interface Reservation {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  order: Order;
}

interface EventDate {
  id: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  reservations: Reservation[];
}

interface Area {
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
}

export interface UserSeat {
  user_id: string;
  seats: Seat[];
}

export interface EventManagement {
  id: string;
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  svg: string;
  createdAt?: string;
  updatedAt?: string;
  ticketingStartTime: string;

  user: User;
  eventDates: EventDate[];
  areas: Area[];
}

export type EventManagementResponse = ApiResponse<EventManagement>;
