import MainLayout from "../layout/MainLayout";
import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationOverviewTemplate";

interface ReservConfirmProps {
  title: string;
}

const ReservationConfirmationPage = ({ title }: ReservConfirmProps) => {
  const reservation = {
    eventName: "콜드플레이 내한공연",
    dateTime: "2024/12/01 19:00 PM",
    place: "올림픽 주 경기장",
    seatInfo: "22번 좌석",
  };

  return (
    <MainLayout>
      <ReservationOverviewTemplate
        title={title}
        reservation={reservation}
      ></ReservationOverviewTemplate>
    </MainLayout>
  );
};

export default ReservationConfirmationPage;
