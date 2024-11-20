import React, { useContext, useMemo } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { Seat } from "../../../types/api/socket";

interface SeatProps {
  seatData: Seat;
}

const SeatObj: React.FC<SeatProps> = ({ seatData }) => {
  const {
    socket,
    isConnected,
    selectSeat,
    selectedSeat,
    eventDateId,
    setSelectedSeat,
  } = useContext(ReservationContext);

  // Compute seat status
  const seatStatus = useMemo(() => {
    // If seat is reserved for current event date
    const isReserved = seatData.reservations.some(
      (reservation) => reservation.eventDate.id === eventDateId
    );

    // If seat is currently selected by this user
    const isSelectedByMe = selectedSeat?.id === seatData.id;

    // If seat is selected by another user
    const isSelectedByOther = seatData.selectedBy && !isSelectedByMe;

    // Selection is expired
    const isExpired =
      seatData.expirationTime && new Date(seatData.expirationTime) < new Date();

    if (isReserved) return "reserved";
    if (isSelectedByMe) return "selected";
    if (isSelectedByOther && !isExpired) return "temporary_hold";
    return "available";
  }, [seatData, eventDateId, selectedSeat]);

  // Get color based on status
  const getStatusColor = () => {
    switch (seatStatus) {
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

  // Get hover state class based on availability
  const getHoverClass = () => {
    if (seatStatus === "available") {
      return "hover:opacity-80 cursor-pointer";
    }
    if (seatStatus === "selected") {
      return "hover:opacity-80 cursor-pointer";
    }
    return "cursor-not-allowed";
  };

  // Handle seat click
  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isConnected || !socket) {
      console.warn("Socket not connected");
      return;
    }

    if (seatStatus === "reserved" || seatStatus === "temporary_hold") {
      return;
    }

    // If clicking already selected seat, deselect it
    if (seatStatus === "selected") {
      selectSeat(seatData.id); // This will trigger a deselect on the server
      setSelectedSeat(null);
      return;
    }

    // Select new seat
    if (seatStatus === "available") {
      selectSeat(seatData.id);
      setSelectedSeat(seatData);
    }
  };

  // Tooltip content
  const getTooltipContent = () => {
    const base = `Seat ${seatData.area}-${seatData.row}-${seatData.number}`;
    switch (seatStatus) {
      case "available":
        return `${base} (Available)`;
      case "reserved":
        return `${base} (Reserved)`;
      case "selected":
        return `${base} (Selected by you)`;
      case "temporary_hold":
        return `${base} (Selected by another user)`;
      default:
        return base;
    }
  };

  return (
    <g onClick={handleSeatClick} className="seat-group">
      {/* Selection Indicator (larger circle for selected seats) */}
      {seatStatus === "selected" && (
        <circle
          r="18"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}

      {/* Base Seat Circle */}
      <circle
        r="15"
        fill={getStatusColor()}
        stroke="#1F2937"
        strokeWidth="2"
        className={`
          seat 
          transition-colors 
          duration-200 
          ${getHoverClass()}
        `}
      />

      {/* Tooltip */}
      <title>{getTooltipContent()}</title>

      {/* Timer for temporary holds */}
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
    </g>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(SeatObj);
