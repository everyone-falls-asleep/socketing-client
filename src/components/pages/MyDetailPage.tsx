import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { GetOrder } from "../../types/api/order";
import Font from "../atoms/fonts/Font";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import Button from "../atoms/buttons/Button";
import { useState } from "react";

const MyDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { order: GetOrder };
  const order = state.order;
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!order) {
    return <div>{fetchErrorMessages.noReservationData}</div>;
  }

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  // 예매 취소 확인
  const handleCancelReservation = () => {
    closeModal(); // 모달 닫기
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <>
      <MainLayout>
        <div className="max-w-3xl mx-auto p-5 md:p-10 overflow-y-auto max-h-[calc(100%-64px)]">
          <div className="bg-white rounded-md shadow-lg">
            {/* Header Section with Event Image */}
            <div className="relative h-48 ">
              <img
                src={order.eventThumbnail}
                alt={order.eventTitle}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20">
                <p className="!text-white text-2xl md:text-4xl font-bold mb-2">
                  {order.eventTitle}
                </p>
                <Font className="text-white/90 font-bold text-lg md:text-xl">
                  {order.eventCast}
                </Font>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="font-bold">
                    {order.userEmail.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <Font className="font-bold text-gray-800">
                    {order.userEmail.slice(0, 3)}
                  </Font>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400">📅</div>
                  <div>
                    <Font className="font-bold text-gray-700 mb-1">일시</Font>
                    <Font className="text-gray-600">
                      {formatToKoreanDateAndTime(order.eventDate)}
                    </Font>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400">📍</div>
                  <div>
                    <Font className="font-bold text-gray-700 mb-1">장소</Font>
                    <Font className="text-gray-600">{order.eventPlace}</Font>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400">🎫</div>
                  <div>
                    <Font className="font-bold text-gray-700 mb-1">좌석</Font>
                    <Font className="text-gray-600">
                      {order.reservations.map((reservation, index) => (
                        <div key={reservation.seatId || index} className="mb-1">
                          {reservation.seatAreaLabel}구역 {reservation.seatRow}
                          열 {reservation.seatNumber}번
                        </div>
                      ))}
                    </Font>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Font className="text-sm text-gray-500 text-center block">
                  공연 당일 예매내역을 확인할 수 있는 신분증을 지참해주세요.
                </Font>
              </div>
            </div>
          </div>

          {/* 예매 취소 버튼 */}
          <div className="fixed bottom-0 right-8 md:left-0 md:right-0 pb-4  flex justify-center">
            <Button
              onClick={openModal}
              className="bg-se-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              예매 취소
            </Button>
          </div>
        </div>
        {/* 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">예매 취소</h2>
              <p className="text-gray-600 mb-6">
                정말 예매를 취소하시겠습니까?
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  size="sm"
                  onClick={handleCancelReservation}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  예매 취소
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  뒤로 가기
                </Button>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default MyDetailPage;
