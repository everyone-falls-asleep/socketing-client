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

interface OrderEvent {
  title: string;
  thumbnail: string;
  place: string;
  cast: string;
  ageLimit: number;
  ticketingStartTime: string;
}

interface OrderUser {
  email: string;
  nickname: string;
  profileImage?: string;
  role: string;
}

interface OrderReservation {
  id: string;
  seat: OrderSeat;
}

interface OrderSeat {
  row: number;
  number: number;
  area: OrderArea;
}

interface OrderArea {
  label: string;
  price: number;
}

export interface Order {
  id: string;
  updatedAt: string;
  createdAt: string;
  user: OrderUser;
}

export interface OrderResponseData {
  event: OrderEvent;
  order: Order;
  reservations: OrderReservation[];
}

export interface OrderResponse {
  data: OrderResponseData;
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
  seatsSelected: (response: SeatsSelectedResponse[]) => void; // 예매된 상태 다른 사용자들에게 전달하는 용으로도 쓰임
  serverTime: (time: string) => void;
  error: (response: ErrorResponse) => void;
  areaExited: (message: string) => void;
  seatsReserved: (response: OrderResponse) => void; // 예매된 사용자에게만. 이거 받으면 결제창으로 응답 데이터 전달하며 화면 전환
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
  reserveSeats: (params: {
    seatIds: string[];
    eventId: string;
    eventDateId: string;
    areaId: string;
    userId: string;
  }) => void;
  exitArea: (params: {
    eventId: string;
    eventDateId: string;
    areaId: string;
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
