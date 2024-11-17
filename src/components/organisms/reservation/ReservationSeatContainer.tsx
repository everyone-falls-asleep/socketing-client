import { Seat } from "../../../types/api/event";
import SeatContainer from "../seat-container/SeatContainer";
import { createMockSocket } from "../../../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface ReservationSeatContainerProps {
  seatsData: Seat[];
  socket: MockSocketType | null;
  svg: string;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  seatsData,
  socket,
  svg,
}: ReservationSeatContainerProps) => {
  return (
    <SeatContainer
      seatsData={seatsData}
      socket={socket}
      svg={svg}
      viewBox="0 0 1024 768"
    />
  );
};

export default ReservationSeatContainer;
