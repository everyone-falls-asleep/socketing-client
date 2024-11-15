import { Seat } from "../../../types/api/event";
import SeatContainer from "../seat-container/SeatContainer";
import { createMockSocket } from "../../../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface ReservationSeatContainerProps {
  seatsData: Seat[];
  socket: MockSocketType | null;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  seatsData,
  socket,
}: ReservationSeatContainerProps) => {
  return <SeatContainer seatsData={seatsData} socket={socket} />;
};

export default ReservationSeatContainer;
