import { Socket } from "socket.io-client";

// Base Types
export interface Seat {
  id: string;
  cx: number;
  cy: number;
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
  areaId: string;
}

export interface AreaSocket {
  id: string;
  label: string;
  price: number;
  svg: string;
}

export interface RoomJoinedResponse {
  message: string;
  areas: AreaSocket[];
}

export interface AreaJoinedResponse {
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
  areaJoined: (response: AreaJoinedResponse) => void;
  seatsSelected: (response: SeatsSelectedResponse[]) => void;
  serverTime: (time: string) => void;
  error: (response: ErrorResponse) => void;
  areaExited: (message: string) => void;
}

export interface ClientToServerEvents {
  joinRoom: (params: { eventId: string; eventDateId: string }) => void;
  joinArea: (params: {
    eventId: string;
    eventDateId: string;
    areaId: string;
  }) => void;
  selectSeats: (params: {
    seatId: string;
    eventId: string;
    eventDateId: string;
    areaId: string;
    numberOfSeats: number;
  }) => void;
  reserveSeat: (params: {
    seatId: string;
    eventId: string;
    eventDateId: string;
  }) => void;
  exitArea: (params: {
    eventId: string;
    eventDateId: string;
    areaId: string;
    userId: string;
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
