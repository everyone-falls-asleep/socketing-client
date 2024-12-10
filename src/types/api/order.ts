import { User } from "./user";
import { EventDate, Seat } from "./event";
import { ApiResponse } from "./common";

export interface NewOrder {
  eventId: string;
  eventDateId: string;
  seatIds: string[];
}

export interface Order {
  id: string;
  orderStatus: string;
  totalAmount: string;

  user: User;
  reservations: Reservation[];

  created_at?: string;
  update_at?: string;
}

export interface GetOrder {
  orderId: string;
  orderCreatedAt: string;
  orderCanceledAt: string;
  userId: string;
  userNickname: string;
  userEmail: string;
  userProfileImage: string | null;
  userRole: string;
  eventId: string;
  eventDateId?: string;
  eventDate: string;
  eventTitle: string;
  eventThumbnail: string;
  eventPlace: string;
  eventCast: string;
  eventAgeLimit: number | null;
  eventSvg: string;
  reservations: Reservations[];
}

export interface Reservations {
  reservationId?: string;
  seatId: string; // 좌석 ID
  seatCx: number; // 좌표 X
  seatCy: number; // 좌표 Y
  seatRow: number; // 좌석 열
  seatNumber: number; // 좌석 번호
  seatAreaId: string; // 좌석 구역 ID
  seatAreaLabel: string; // 좌석 구역 라벨
  seatAreaPrice: number; // 좌석 가격
}
interface Reservation {
  id: string;
  eventDate: EventDate;
  seat: Seat;
}

export interface OrderSeat {
  id: string;
  cx: number;
  cy: number;
  row: number;
  number: number;
  area: Area;
}

export interface Area {
  id: string;
  price: number;
  label: string;
  svg: string;
}

export type NewOrderResponse = ApiResponse<Order>;
export type GetAllOrderResponse = ApiResponse<GetOrder[]>;
export type GetOneOrderResponse = ApiResponse<GetOrder>;
export type OrderSeatResponse = ApiResponse<OrderSeat[]>;
