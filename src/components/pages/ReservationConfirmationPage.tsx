import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useParams } from "react-router-dom";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { NewReservationResponse } from "../../types/api/reservation";
import { fetchOneReservation } from "../../api/reservations/reservationsApi";
import { fetchErrorMessages } from "../../constants/errorMessages";
const ReservationConfirmationPage = () => {
  const { reservationId } = useParams();

  const useReservation = createResourceQuery<NewReservationResponse>(
    "single-reservation",
    fetchOneReservation
  );

  const { data, isLoading, isError } = useReservation(reservationId);

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noReservationData}</p>;

  const reservationData = data.data;

  return (
    <ReservationOverviewTemplate
      // title="예매가 완료되었습니다"
      reservation={reservationData}
    />
  );
};

export default ReservationConfirmationPage;
