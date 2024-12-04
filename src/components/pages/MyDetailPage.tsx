import { useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { GetOrder } from "../../types/api/order";
import Font from "../atoms/fonts/Font";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";

const MyDetailPage = () => {
  const location = useLocation();
  const state = location.state as { order: GetOrder };
  const order = state.order;
  if (!order) {
    return <div>{fetchErrorMessages.noReservationData}</div>;
  }

  return (
    <>
      <MainLayout>
        <div className="max-w-3xl mx-auto px-10 pt-10">
          <p className="text-center text-xl md:text-2xl font-bold mb-2">
            {"예매가 완료되었습니다."}
          </p>

          {/* 유저테스트를 위한 */}
          <div className="flex flex-col items-center justify-center rounded-md h-[100px] bg-gray-100 space-y-2">
            <label className="text-lg font-bold text-gray-700">
              ❗️❗️설문조사에 참여해주세요 ❗️❗️🙏
            </label>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc2kS5zHgkzFog7PYnzRHwRLWjPIGhBEteYToUZ9IZK1PkAFw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105"
            >
              설문조사 링크 열기
            </a>
          </div>
        </div>
        <div className="max-w-3xl mx-auto p-5 md:p-10">
          <div className="bg-white rounded-md shadow-lg overflow-hidden">
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
        </div>
      </MainLayout>
    </>
  );
};

export default MyDetailPage;
