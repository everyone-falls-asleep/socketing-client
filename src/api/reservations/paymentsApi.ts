import axios from "axios";
import {
  NewPayment,
  PaymentDetailsResponse,
  UpdatedPaymentResponse,
  UpdatePayment,
} from "../../types/api/payment";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "payments/";

// 새 결제 요청
const createNewPayment = async ({
  orderId,
  paymentMethod,
  totalAmount,
}: NewPayment): Promise<PaymentDetailsResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await axios.post<PaymentDetailsResponse>(
    API_URL,
    {
      orderId,
      paymentMethod,
      totalAmount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 결제 업데이트 요청
const updatePayment = async ({
  orderId,
  paymentId,
  newPaymentStatus,
}: UpdatePayment): Promise<UpdatedPaymentResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
    }

    const response = await axios.patch<UpdatedPaymentResponse>(
      API_URL,
      {
        orderId, // 주문 ID 추가
        paymentId,
        newPaymentStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더 추가!!
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("결제 상태 업데이트 실패:", error);
    throw error;
  }
};
export { createNewPayment, updatePayment };
