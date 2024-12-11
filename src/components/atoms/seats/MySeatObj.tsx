import React from "react";
import { getHoverClass, getStatusColor } from "../../../utils/getSeatInfo";
import { OrderSeat } from "../../../types/api/order";
import { SeatStatus } from "../../../types/api/socket";

interface SeatProps {
  seatData: OrderSeat;
  seatStatus: SeatStatus;
}

const MySeatObj: React.FC<SeatProps> = ({ seatStatus }) => {
  const statusColor = getStatusColor(seatStatus);
  const hoverClass = getHoverClass(seatStatus);

  return (
    <g className="seat-group">
      {seatStatus === "selected" && (
        <circle
          r="12"
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

      {seatStatus === "available" && (
        <circle
          r="8"
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          strokeDasharray="100"
        ></circle>
      )}
      {seatStatus === "reserved" && (
        <circle
          r="8"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeDasharray="100"
        ></circle>
      )}
    </g>
  );
};

export default MySeatObj;
