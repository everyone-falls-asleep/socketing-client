import React, { useRef } from "react";
import { Seat, UserSeat } from "../../../types/api/event";
import {
  AdminSeatObj,
  SelectedAdminSeatObj,
} from "../../atoms/seats/AdminSeatObj";
import AdminSvgWrapper from "../../../utils/AdminSvgWrapper";

interface SeatContainerProps {
  seatsData: Seat[];
  selectedSeatsData: UserSeat[];
  svg: string;
  viewBox?: string;
}

const AdminSeatContainer: React.FC<SeatContainerProps> = ({
  seatsData,
  selectedSeatsData,
  svg,
  viewBox = "0 0 10240 7680",
}) => {
  // Zoom & Pan State
  const containerRef = useRef<HTMLDivElement>(null);
  const translate = { x: 0, y: 0 };
  const scale = 1;

  const renderSeat = (seatData: Seat) => {
    const userEntry = selectedSeatsData.find((userSeat) =>
      userSeat.seats.some((selectedSeat) => selectedSeat.id === seatData.id)
    );

    const isSelected = !!userEntry; // userEntry가 존재하면 true
    const userId = userEntry?.user_id || ""; // 선택된 좌석이 없는 경우 빈 문자열

    return (
      <g
        key={seatData.id}
        transform={`translate(${seatData.cx},${seatData.cy})`}
      >
        {isSelected ? (
          <SelectedAdminSeatObj user_id={userId} />
        ) : (
          <AdminSeatObj />
        )}
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden bg-gray-100"
      style={{ height: "100%" }}
    >
      {/* Main Seat Container */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <AdminSvgWrapper
          svgString={svg}
          seats={seatsData}
          selectedSeats={selectedSeatsData}
          renderSeat={renderSeat}
          viewBox={viewBox}
        />
      </div>
    </div>
  );
};

export default AdminSeatContainer;
