import Container from "../../layout/Container";
import { Subtitle, BoldText } from "../../atoms/title/Title";

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
      <Subtitle>{eventName}</Subtitle>
      <BoldText textAlign="center">{dateTime}</BoldText>
      <br />
      <BoldText textAlign="center">{place}</BoldText>
      <br />
      <BoldText textAlign="center">{seatInfo}</BoldText>
    </Container>
  );
};

export default ReservationInfo;
