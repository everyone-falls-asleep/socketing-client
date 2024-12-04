import { ApiResponse } from "./common";
import { Reservation } from "./reservation";
import { User } from "./user";
// import { Event } from "./event"
import { GetOrder } from "./order.ts";

export type PaymentMethod =
  | "bank_transfer"
  | "credit_card"
  | "paypal"
  | "socket_pay";
export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "canceled"
  | "refunded";

interface Order {
  id: string; // 주문 ID
  createdAt: string; // 주문 생성 시간
  updatedAt: string; // 주문 수정 시간
  deletedAt?: string;
}

export interface Payment {
  id: string;
  paymentAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAt: string | null; // 결제 완료 시간 (null이면 결제x)
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePayment {
  orderId: string;
  paymentId: string;
  newPaymentStatus: PaymentStatus;
}

export interface PaymentDetails {
  order: Order; // 주문 정보
  payment: Payment; // 결제 정보
  user?: User; // 사용자 정보
  reservations?: Reservation[]; // 예약 정보
}

export interface NewPayment {
  orderId: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
}

export interface UpdatedPayment extends GetOrder {
  orderUpdatedAt: string;
  orderDeletedAt: string | null;
  paymentId: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentAmount: number;
  paymentPaidAt: string;
  paymentCreatedAt: string;
  paymentUpdatedAt: string;
}

export type PaymentDetailsResponse = ApiResponse<PaymentDetails>;
export type UpdatedPaymentResponse = ApiResponse<UpdatedPayment>;
