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
  const { status, holdSeat } = useSeatStatus({ socket, seatId });

  const getStatusColor = () => {
    switch (status?.status) {
      case "available":
        return "#9CA3AF";
      case "reserved":
        return "#EF4444";
      case "temporary_hold":
        return "#FBBF24";
      default:
        return "#FFF";
    }
  };

  const handleSeatClick = () => {
    if (status?.status !== "available") return;
    setSelectedSeat(seatData);
    holdSeat();
  };

  return (
    <circle
      cx={seatData.x}
      cy={seatData.y}
      r="150"
      fill={getStatusColor()}
      stroke="#1F2937"
      strokeWidth="2"
      onClick={handleSeatClick}
      className={`seat transition-colors duration-200 ${
        status?.status === "available"
          ? "hover:opacity-80 cursor-pointer"
          : "hover:opacity-80 cursor-not-allowed"
      }`}
    />
  );
};

export default SeatObj;
