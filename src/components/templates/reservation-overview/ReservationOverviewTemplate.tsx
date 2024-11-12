import ReservationInfo from "../../organisms/reservation-infos/ReservationInfo";
import { Title } from "../../atoms/title/Title";
import Container from "../../layout/Container";

interface Reservation {
  eventName: string;
  dateTime: string;
  place: string;
  seatInfo: string;
}

interface ReservationOverviewTemplateProps {
  title: string;
  reservation: Reservation;
}

const ReservationOverviewTemplate = ({
  title,
  reservation,
}: ReservationOverviewTemplateProps) => {
  return (
    <Container width="1000px">
      <Title>{title}</Title>
      <ReservationInfo
        eventName={reservation.eventName}
        dateTime={reservation.dateTime}
        place={reservation.place}
        seatInfo={reservation.seatInfo}
      ></ReservationInfo>
    </Container>
  );
};

export default ReservationOverviewTemplate;
