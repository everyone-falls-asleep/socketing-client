import axios from "axios";
import { NewPayment, PaymentDetailsResponse } from "../../types/api/payment";
import { baseURL } from "../../constants/api";

const API_URL = baseURL + "payments/";

// 새 결제 요청
const createNewPayment = async ({
  orderId,
  paymentMethod,
  totalAmount,
}: NewPayment): Promise<PaymentDetailsResponse> => {
  const response = await axios.post<PaymentDetailsResponse>(API_URL, {
    orderId,
    paymentMethod,
    totalAmount,
  });
  return response.data;
};

export { createNewPayment };
