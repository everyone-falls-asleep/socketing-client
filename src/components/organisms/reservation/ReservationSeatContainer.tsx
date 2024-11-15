import { Socket } from "socket.io-client";
import { Seat } from "../../../types/api/event";
import SeatContainer from "../seat-container/SeatContainer";

interface ReservationSeatContainerProps {
  seatsData: Seat[];
  socket: Socket;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  seatsData,
  socket,
}: ReservationSeatContainerProps) => {
  return <SeatContainer seatsData={seatsData} socket={socket} />;
};

export default ReservationSeatContainer;
