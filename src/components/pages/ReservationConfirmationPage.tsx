import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationOverviewTemplate";
import Header from "../templates/header/Header";

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
    <>
      <Header></Header>
      <ReservationOverviewTemplate
        title={title}
        reservation={reservation}
      ></ReservationOverviewTemplate>
    </>
  );
};

export default ReservationConfirmationPage;
