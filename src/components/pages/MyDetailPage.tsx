import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useLocation } from "react-router-dom";
import { Reservation } from "../../types/api/reservation";
import MainLayout from "../layout/MainLayout";

const MyDetailPage = () => {
  const location = useLocation();
  const state = location.state as { reservation: Reservation };
  const reservation = state.reservation;

  return (
    <>
      <MainLayout>
        <ReservationOverviewTemplate reservation={reservation} />;
      </MainLayout>
    </>
  );
};

export default MyDetailPage;
