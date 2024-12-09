import Font from "../../atoms/fonts/Font";
import { fetchErrorMessages } from "../../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";
import { UpdatedPayment } from "../../../types/api/payment";

interface ReservationConfirmProps {
  data: UpdatedPayment;
}

const ReservationConfirmationTemplate = ({ data }: ReservationConfirmProps) => {
  if (!data) {
    return <div>{fetchErrorMessages.noReservationData}</div>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-5 md:p-10">
        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          {/* Header Section with Event Image */}
          <div className="relative h-48 ">
            <img
              src={data.eventThumbnail}
              alt={data.eventTitle}
              className="w-full h-full object-cover rounded-t-lg opacity-50"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20">
              <p className="!text-white text-2xl md:text-4xl font-bold mb-2">
                {data.eventTitle}
              </p>
              <Font className="text-white/90 font-bold text-lg md:text-xl">
                {data.eventCast}
              </Font>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="font-bold">{data.userEmail}</span>
              </div>
              <div>
                <Font className="font-bold text-gray-800">
                  {data.userEmail}
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
                    {formatToKoreanDateAndTime(data.eventDate)}
                  </Font>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📍</div>
                <div>
                  <Font className="font-bold text-gray-700 mb-1">장소</Font>
                  <Font className="text-gray-600">{data.eventPlace}</Font>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">🎫</div>
                <div>
                  <Font className="font-bold text-gray-700 mb-1">좌석</Font>
                  <Font className="text-gray-600">
                    {data.reservations.map((reservation, index) => (
                      <div key={reservation.seatId || index} className="mb-1">
                        {reservation.seatAreaLabel}구역 {reservation.seatRow}열{" "}
                        {reservation.seatNumber}번
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
    </>
  );
};

export default ReservationConfirmationTemplate;
