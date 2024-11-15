import { Seat } from "../../../types/api/event";
import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { useSeatStatus } from "../../../hooks/useSeatStatus";
import { Socket } from "socket.io-client";

interface SeatProps {
  seatData: Seat;
  socket: Socket;
}

const SeatObj = ({ seatData, socket }: SeatProps) => {
  const seatId = seatData.seat_id;
  const { setSelectedSeat } = useContext(ReservationContext);
  const { status, reserveSeat } = useSeatStatus({ socket, seatId });

  const getStatusColor = () => {
    switch (status?.status) {
      case "available":
        return "#4ADE80"; // green
      case "reserved":
        return "#EF4444"; // red
      case "temporary_hold":
        return "#FBBF24"; // yellow
      default:
        return "#9CA3AF"; // gray
    }
  };

  const handleSeatClick = () => {
    setSelectedSeat(seatData);
    reserveSeat();
  };

  return (
    <>
      <svg
        viewBox="0 0 800 800"
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <circle
          cx={seatData.x}
          cy={seatData.y}
          r="20"
          fill={getStatusColor()}
          stroke="#1F2937"
          strokeWidth="2"
          onClick={handleSeatClick}
          style={{ cursor: "pointer", pointerEvents: "all" }}
          className="transition-colors duration-200 hover:opacity-80"
        />
      </svg>
    </>
  );
};

export default SeatObj;
