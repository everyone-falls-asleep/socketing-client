import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useLocation } from "react-router-dom";
import { Reservation } from "../../types/api/reservation";

const MyDetailPage = () => {
  const location = useLocation();
  const state = location.state as { reservation: Reservation };
  const reservation = state.reservation;

  return <ReservationOverviewTemplate reservation={reservation} />;
};

export default MyDetailPage;
