import React, { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { Seat } from "../../../types/api/socket";

interface SeatProps {
  seatData: Seat;
}

type SeatStatus = "available" | "reserved" | "temporary_hold" | "selected";

const getSeatStatus = (
  seatData: Seat,
  eventDateId: string | null,
  currentUserId: string | null
): SeatStatus => {
  if (!eventDateId) return "available";

  const isReserved = seatData.reservations.some(
    (reservation) => reservation.eventDate.id === eventDateId
  );

  if (isReserved) return "reserved";
  if (seatData.selectedBy) {
    if (
      seatData.expirationTime &&
      new Date(seatData.expirationTime) < new Date()
    ) {
      return "available";
    }
    return seatData.selectedBy === currentUserId
      ? "selected"
      : "temporary_hold";
  }

  return "available";
};

const getStatusColor = (status: SeatStatus) => {
  switch (status) {
    case "available":
      return "#FFFFFF";
    case "reserved":
      return "#9CA3AF";
    case "selected":
      return "#60A5FA";
    case "temporary_hold":
      return "#FBBF24";
    default:
      return "#9CA3AF";
  }
};

const getHoverClass = (status: string) => {
  if (status === "available" || status === "selected") {
    return "hover:opacity-80 cursor-pointer";
  }
  return "cursor-not-allowed";
};

const SeatObj: React.FC<SeatProps> = ({ seatData }) => {
  const { eventDateId, selectSeat, socket, isConnected, currentUserId } =
    useContext(ReservationContext);

  const seatStatus = getSeatStatus(seatData, eventDateId, currentUserId);
  const statusColor = getStatusColor(seatStatus);
  const hoverClass = getHoverClass(seatStatus);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConnected || !socket) return;
    if (seatStatus === "reserved" || seatStatus === "temporary_hold") return;
    selectSeat(seatData.id);
  };

  return (
    <g onClick={handleClick} className="seat-group">
      {seatStatus === "selected" && (
        <circle
          r="18"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}

      <circle
        r="15"
        fill={statusColor}
        stroke="#1F2937"
        strokeWidth="2"
        className={`seat transition-colors duration-200 ${hoverClass}`}
      />

      {seatStatus === "temporary_hold" && seatData.expirationTime && (
        <circle
          r="15"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeDasharray="100"
          className="animate-[countdown_10s_linear_infinite]"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="100"
            dur="10s"
            repeatCount="1"
          />
        </circle>
      )}

      {seatStatus === "available" && !seatData.selectedBy && (
        <circle
          r="15"
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
