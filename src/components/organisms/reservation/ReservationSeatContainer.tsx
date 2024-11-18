import { Seat } from "../../../types/api/event";
import SeatContainer from "../seat-container/SeatContainer";

interface ReservationSeatContainerProps {
  seatsData: Seat[];
  svg: string;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  seatsData,
  svg,
}: ReservationSeatContainerProps) => {
  return (
    <SeatContainer seatsData={seatsData} svg={svg} viewBox="0 0 1024 768" />
  );
};

export default ReservationSeatContainer;
