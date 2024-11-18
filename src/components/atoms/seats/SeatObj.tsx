import { Seat } from "../../../types/api/event";
import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { useSeatStatus } from "../../../hooks/useSeatStatus";

interface SeatProps {
  seatData: Seat;
}

const SeatObj = ({ seatData }: SeatProps) => {
  const seatId = seatData.id;
  const { setSelectedSeat, socket } = useContext(ReservationContext);
  const { status, holdSeat } = useSeatStatus({ socket, seatId });

  const getStatusColor = () => {
    switch (status?.status) {
      case "available":
        return "#FFF";
      case "reserved":
        return "#9CA3AF";
      case "temporary_hold":
        return "#FBBF24";
      default:
        return "#9CA3AF";
    }
  };

  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status?.status !== "available") return;
    setSelectedSeat(seatData);
    holdSeat();
  };

  return (
    <circle
      r="20"
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
