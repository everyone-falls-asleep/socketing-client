import MainLayout from "../../layout/MainLayout";
import SubTitle from "../../atoms/titles/subtitle/SubTitle";
import Font from "../../atoms/fonts/Font";
import { NewReservationResponseData } from "../../../types/api/reservation";
import { fetchErrorMessages } from "../../../constants/errorMessages";

interface ReservationConfirmProps {
  reservation: NewReservationResponseData;
  //content : 다중 예매 시 업데이트 필요
}

const ReservationConfirmationTemplate = ({
  reservation,
}: ReservationConfirmProps) => {
  const formattedDate = new Date(reservation.eventDate.date)
    .toISOString()
    .replace("T", " ")
    .slice(0, 16);

  if (!reservation.eventDate.event) {
    return <div>{fetchErrorMessages.noReservationData}</div>;
  }
  const reservationData = reservation.eventDate.event;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        <SubTitle className="text-center mb-8">
          {"예매가 완료되었습니다."}
        </SubTitle>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section with Event Image */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
            <img
              src={reservationData.thumbnail}
              alt={reservationData.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60">
              <SubTitle className="!text-white font-bold mb-2">
                {reservationData.title}
              </SubTitle>
              <Font className="text-white/90">
                출연진: {reservationData.cast}
              </Font>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">
                  {reservation.user.email.slice(0, 1)}
                </span>
              </div>
              <div>
                <Font className="font-bold text-gray-800">
                  {reservation.user.email.slice(0, 3)}
                </Font>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📅</div>
                <div>
                  <Font className="font-bold text-gray-700">일시</Font>
                  <Font className="text-gray-600">{formattedDate}</Font>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📍</div>
                <div>
                  <Font className="font-bold text-gray-700">장소</Font>
                  <Font className="text-gray-600">{reservationData.place}</Font>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">🎫</div>
                <div>
                  <Font className="font-bold text-gray-700">좌석</Font>
                  <Font className="text-gray-600">
                    {reservation.seat.area}구역 {reservation.seat.row}열{" "}
                    {reservation.seat.number}번
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
  );
};

export default ReservationConfirmationTemplate;
