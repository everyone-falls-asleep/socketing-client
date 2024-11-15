import { Seat } from "../../../types/api/event";
import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { useSeatStatus } from "../../../hooks/useSeatStatus";
import { createMockSocket } from "../../../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface SeatProps {
  seatData: Seat;
  socket: MockSocketType | null;
}

const SeatObj = ({ seatData, socket }: SeatProps) => {
  const seatId = seatData.seat_id;
  const { setSelectedSeat } = useContext(ReservationContext);
  const { status, reserveSeat } = useSeatStatus({ socket, seatId });

  const getStatusColor = () => {
    switch (status?.status) {
      case "available":
        return "#4ADE80";
      case "reserved":
        return "#EF4444";
      case "temporary_hold":
        return "#FBBF24";
      default:
        return "#9CA3AF";
    }
  };

  const handleSeatClick = () => {
    setSelectedSeat(seatData);
    reserveSeat();
  };

  return (
    <circle
      cx={seatData.x}
      cy={seatData.y}
      r="200"
      fill={getStatusColor()}
      stroke="#1F2937"
      strokeWidth="2"
      onClick={handleSeatClick}
      className="seat transition-colors duration-200 hover:opacity-80 cursor-pointer"
    />
  );
};

export default SeatObj;
