import { Socket } from "socket.io-client";

// Base Types
export interface Seat {
  id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
  reservations: Array<{
    id: string;
    eventDate: {
      id: string;
      date: string;
    };
  }>;
  selectedBy?: string | null;
  updatedAt: string;
  expirationTime: string;
  reservedBy?: string;
}

export interface RoomJoinedResponse {
  message: string;
  seats: Seat[];
}

export interface SeatsSelectedResponse {
  seatId: string;
  selectedBy: string | null;
  updatedAt: string;
  expirationTime: string;
  reservedBy?: string;
}

export interface ErrorResponse {
  message: string;
}

export interface ServerToClientEvents {
  roomJoined: (response: RoomJoinedResponse) => void;

  seatsSelected: (response: SeatsSelectedResponse[]) => void;

  // "seat:update": (seat: Seat) => void;
  // "seats:bulk_update": (seats: Seat[]) => void;
  // "seat:error": (error: { message: string; seatId: string }) => void;

  serverTime: (time: string) => void;

  error: (response: ErrorResponse) => void;
}

export interface ClientToServerEvents {
  joinRoom: (params: { eventId: string; eventDateId: string }) => void;

  // "seat:watch": (seatId: string) => void;
  // "seat:unwatch": (seatId: string) => void;
  // "seat:temporary_hold": (seatId: string) => void;

  selectSeats: (params: {
    seatId: string;
    eventId: string;
    eventDateId: string;
    numberOfSeats: number;
  }) => void;

  reserveSeat: (params: {
    seatId: string;
    eventId: string;
    eventDateId: string;
  }) => void;
}

// Main Socket Type
export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

// Helper Types
export type SeatStatus =
  | "available"
  | "reserved"
  | "selected"
  | "temporary_hold";
// | "adjacent";

export interface Point {
  x: number;
  y: number;
}
