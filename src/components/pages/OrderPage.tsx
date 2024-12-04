import Button from "../atoms/buttons/Button";
import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderResponseData } from "../../types/api/socket";
import { createNewPayment } from "../../api/reservations/paymentsApi";
import { NewPayment } from "../../types/api/payment";
import { PaymentMethod } from "../../types/api/payment";

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { orderData?: OrderResponseData };
  const orderData = state.orderData;

  const [isAgreed, setIsAgreed] = useState(false); // 구매 동의 체크박스 상태
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // 선택된 결제 방법

  const handlePayment = async () => {
    if (!isAgreed) {
      toast.error("구매조건 확인 및 결제 진행에 동의해주세요!");
      return;
    }

    if (!paymentMethod) {
      toast.error("결제 방법을 선택해주세요!");
      return;
    }

    if (!orderData) {
      toast.error("주문 데이터가 없습니다!");
      return;
    }

    const totalAmount = orderData.reservations.reduce(
      (acc, reservation) => acc + reservation.seat.area.price,
      0
    );

    const paymentData: NewPayment = {
      orderId: orderData.order.id,
      paymentMethod: paymentMethod as PaymentMethod,
      totalAmount,
    };

    try {
      const response = await createNewPayment(paymentData);

      if (response.code === 0) {
        toast.success("결제가 진행됩니다!");
        // 결제 페이지로 이동하며 데이터 전달
        navigate(`/payment`, {
          state: { paymentData: response.data, totalAmount },
        });
      } else {
        toast.error(`결제 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("결제 요청 실패:", error);
      toast.error("결제 처리 중 오류가 발생했습니다.");
    }
  };

  if (!orderData) return;
  const order = orderData.order;
  const event = orderData.event;
  const reservations = orderData.reservations;

  return (
    <MainLayout>
      <div className="bg-gray-100 h-[calc(100vh-132px)] flex justify-center">
        <div className="h-full max-w-4xl py-10 px-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">결제 정보</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 왼쪽 */}
            <div className="md:col-span-2 space-y-6">
              {/* 공연 정보 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">공연 티켓 정보</h2>
                <div className="flex items-center">
                  <img
                    src={event.thumbnail}
                    alt="공연 포스터"
                    className="w-24 h-28 rounded-md object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{event.place}</p>
                    <p className="text-gray-600 text-sm mb-1">
                      2024년 12월 31일 밤 11시 59분
                    </p>
                    <p className="text-gray-600 text-sm">{event.cast}</p>
                  </div>
                </div>
                <hr className="my-4" />

                <div className="space-y-3">
                  <div>
                    {reservations.map((reservation) => (
                      <div
                        className="flex justify-between"
                        key={reservation.id}
                      >
                        <span>
                          {reservation.seat.area.label}구역{" "}
                          {reservation.seat.row}열 {reservation.seat.number}번
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 주문자 정보 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">주문자 정보</h2>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      {order.user.nickname}
                    </p>
                    <p className="text-sm text-gray-600">{order.user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className="space-y-6">
              {/* 최종 결제 금액 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">최종 결제금액</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  {reservations.map((reservation) => (
                    <div className="flex justify-between" key={reservation.id}>
                      <span>
                        {reservation.seat.area.label}구역 {reservation.seat.row}
                        열 {reservation.seat.number}번
                      </span>
                      <span>{reservation.seat.area.price}원</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>총 결제금액</span>
                    <span>
                      {reservations.reduce(
                        (acc, reservation) => acc + reservation.seat.area.price,
                        0
                      )}
                      원
                    </span>
                  </div>
                </div>
              </div>

              {/* 결제 방법 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">결제 방법</h2>
                <div className="text-sm">
                  <input
                    type="radio"
                    id="socket_pay"
                    className="mr-2"
                    name="paymentMethod"
                    onChange={() => setPaymentMethod("socket_pay")}
                  />
                  <label htmlFor="socket_pay">소켓 페이</label>
                </div>
              </div>

              {/* 결제 버튼 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="agree"
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    구매조건 확인 및 결제 진행에 동의
                  </label>
                </div>
                <Button
                  onClick={() => {
                    handlePayment().catch((error) => {
                      console.error("결제 처리 중 오류 발생:", error);
                      toast.error("결제 처리 중 문제가 발생했습니다.");
                    });
                  }}
                  className="text-sm w-full"
                >
                  결제하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderPage;
