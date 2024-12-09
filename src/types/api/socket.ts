import { Socket } from "socket.io-client";
import { PaymentMethod, UpdatedPaymentResponse } from "./payment";

// Base Types
export interface Seat {
  id: string;
  cx: number;
  cy: number;
  row: number;
  number: number;
  selectedBy?: string | null;
  updatedAt: string;
  expirationTime: string;
  reservedBy?: string | null;
  areaId: string;
}

export interface Area {
  price: number;
  label: string;
}

export interface OrderResponseData {
  id: string;
  createdAt: string;
  seats: Seat[];
  area: Area;
}

export interface OrderResponse {
  data: OrderResponseData;
}
export interface ApprovedOrderResponse {
  data: UpdatedPaymentResponse;
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

export interface ReservedSeatsStatisticResponse {
  areaId: string;
  totalSeatsNum: number;
  reservedSeatsNum: number;
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
  orderApproved: (response: ApprovedOrderResponse) => void;
  reservedSeatsStatistic: (response: ReservedSeatsStatisticResponse[]) => void;
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
  requestOrder: (params: {
    userId: string;
    orderId: string;
    eventId: string;
    eventDateId: string;
    areaId: string;
    paymentMethod: PaymentMethod;
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
