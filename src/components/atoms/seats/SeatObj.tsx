import React, { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { Seat } from "../../../types/api/socket";
import {
  getHoverClass,
  getSeatStatus,
  getStatusColor,
} from "../../../utils/getSeatInfo";

interface SeatProps {
  seatData: Seat;
}

const SeatObj: React.FC<SeatProps> = ({ seatData }) => {
  const {
    eventDateId,
    selectSeats,
    socket,
    isConnected,
    currentUserId,
    numberOfTickets,
    currentAreaId,
  } = useContext(ReservationContext);

  const seatStatus = getSeatStatus(seatData, eventDateId, currentUserId);
  const statusColor = getStatusColor(seatStatus);
  const hoverClass = getHoverClass(seatStatus);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConnected || !socket || !currentAreaId) return;
    if (seatStatus === "reserved" || seatStatus === "temporary_hold") return;

    selectSeats(seatData.id, currentAreaId, numberOfTickets);
  };

  return (
    <g onClick={handleClick} className="seat-group">
      {seatStatus === "selected" && (
        <circle
          r="10"
          fill="none"
          stroke="#F66687"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}

      <circle
        r="8"
        fill={statusColor}
        stroke="#1F2937"
        strokeWidth="2"
        className={`seat transition-colors duration-200 ${hoverClass}`}
      />

      {seatStatus === "temporary_hold" && seatData.expirationTime && (
        <circle
          r="8"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeDasharray="100"
          className="animate-[countdown_10s_linear_infinite]"
        ></circle>
      )}

      {seatStatus === "available" && !seatData.selectedBy && (
        <circle
          r="8"
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          strokeDasharray="100"
        ></circle>
      )}
    </g>
  );
};

export default SeatObj;
