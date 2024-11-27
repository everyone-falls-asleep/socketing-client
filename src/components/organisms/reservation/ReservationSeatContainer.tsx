import SeatContainer from "../seat-container/SeatContainer";

interface ReservationSeatContainerProps {
  svg: string;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  svg,
}: ReservationSeatContainerProps) => {
  return <SeatContainer svg={svg} />;
};

export default ReservationSeatContainer;
