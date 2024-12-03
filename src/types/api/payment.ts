import { ApiResponse } from "./common";
import { Reservation } from "./reservation";
import { User } from "./user";

export type PaymentMethod = "socket_pay" | "credit_card" | "kakao_pay";

interface Order {
  id: string; // 주문 ID
  createdAt?: string; // 주문 생성 시간
  updatedAt?: string; // 주문 수정 시간
}

export interface Payment {
  id: string;
  paymentAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "completed";
  paidAt: string | null; // 결제 완료 시간 (null이면 결제x)
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentDetails {
  order: Order; // 주문 정보
  payment: Payment; // 결제 정보
  user: User; // 사용자 정보
  reservations: Reservation[]; // 예약 정보
}

export interface NewPayment {
  orderId: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
}

export type PaymentDetailsResponse = ApiResponse<PaymentDetails>;
