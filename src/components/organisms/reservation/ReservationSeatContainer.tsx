import SeatContainer from "../seat-container/SeatContainer";

interface ReservationSeatContainerProps {
  svg: string;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  svg,
}: ReservationSeatContainerProps) => {
  return <SeatContainer svg={svg} viewBox="0 0 1024 768" />;
};

export default ReservationSeatContainer;
