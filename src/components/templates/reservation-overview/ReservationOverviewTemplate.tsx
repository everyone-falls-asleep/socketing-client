import MainLayout from "../../layout/MainLayout";
import Title from "../../atoms/titles/title/Title";
import Font from "../../atoms/fonts/Font";

interface ReservationData {
  user: {
    nickname: string;
    email: string;
    profileImage: string | null;
  };
  eventDate: {
    date: string;
    event: {
      title: string;
      thumbnail: string;
      place: string;
      cast: string;
      ageLimit: number;
    };
  };
  seat: {
    area: number;
    row: number;
    number: number;
  };
}

interface ReservationConfirmProps {
  title: string;
  reservation: ReservationData;
}

const ReservationOverviewTemplate = ({
  title,
  reservation,
}: ReservationConfirmProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        <Title className="text-center mb-8">{title}</Title>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section with Event Image */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
            <img
              src={reservation.eventDate.event.thumbnail}
              alt={reservation.eventDate.event.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60">
              <Title className="text-white mb-2">
                {reservation.eventDate.event.title}
              </Title>
              <Font className="text-white/90">
                출연진: {reservation.eventDate.event.cast}
              </Font>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">
                  {reservation.user.nickname.slice(0, 1).toUpperCase()}
                </span>
              </div>
              <div>
                <Font className="font-bold text-gray-800">
                  {reservation.user.nickname}
                </Font>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📅</div>
                <div>
                  <Font className="font-bold text-gray-700">일시</Font>
                  <Font className="text-gray-600">
                    {formatDate(reservation.eventDate.date)}
                  </Font>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📍</div>
                <div>
                  <Font className="font-bold text-gray-700">장소</Font>
                  <Font className="text-gray-600">
                    {reservation.eventDate.event.place}
                  </Font>
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

export default ReservationOverviewTemplate;
