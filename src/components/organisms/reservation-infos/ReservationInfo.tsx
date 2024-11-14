import Container from "../../layout/Container";
import Title from "../../atoms/titles/title/Title";
import Font from "../../atoms/fonts/Font";

interface ReservationInfoProps {
  eventName: string;
  dateTime: string;
  place: string;
  seatInfo: string;
}

const ReservationInfo = ({
  eventName,
  dateTime,
  place,
  seatInfo,
}: ReservationInfoProps) => {
  return (
    <Container width="600px">
      <Title>{eventName}</Title>
      <Font>{dateTime}</Font>
      <br />
      <Font>{place}</Font>
      <br />
      <Font>{seatInfo}</Font>
    </Container>
  );
};

export default ReservationInfo;
