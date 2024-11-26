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

export interface UserList {
  count: number;
  users: string[];
}

export interface RoomJoinedResponse {
  message: string;
  seats: Seat[];
}

export interface SeatSelectedResponse {
  seatId: string;
  selectedBy: string | null;
  updatedAt: string;
  expirationTime: string;
  reservedBy?: string;
}

export interface AdjacentSeatsResponse {
  seats: SeatSelectedResponse[];
}

// Socket Event Types
export interface ServerToClientEvents {
  // Room events
  roomJoined: (response: RoomJoinedResponse) => void;

  // Seat events
  seatSelected: (response: SeatSelectedResponse) => void;
  "seat:update": (seat: Seat) => void;
  "seats:bulk_update": (seats: Seat[]) => void;
  "seat:error": (error: { message: string; seatId: string }) => void;

  // Server info events
  serverTime: (time: string) => void;
  userList: (userList: UserList) => void;

  // Adjacent seat events
  adjacentSeats: (response: AdjacentSeatsResponse) => void;
}

export interface ClientToServerEvents {
  // Room events
  joinRoom: (params: { eventId: string; eventDateId: string }) => void;

  // Seat events
  "seat:watch": (seatId: string) => void;
  "seat:unwatch": (seatId: string) => void;
  "seat:temporary_hold": (seatId: string) => void;

  selectSeat: (params: {
    seatId: string;
    eventId: string;
    eventDateId: string;
  }) => void;

  selectAdjacentSeats: (params: {
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
  | "temporary_hold"
  | "adjacent";

export interface Point {
  x: number;
  y: number;
}
