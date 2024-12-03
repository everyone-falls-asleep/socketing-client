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
      <div className="absolute right-0 opacity-80 border p-3  text-gray-950 bg-white rounded-lg space-y-2">
        <p className="text-center font-bold text-lg">좌석 예매 정보</p>
        <p className="font-bold text-gray-700">
          <span className="text-black">1</span>구역{" "}
          <span className="text-black">2</span>열{" "}
          <span className="text-black">3</span>번{" "}
        </p>

        <p>
          <span className="font-bold ">ID:</span> 김혜다
        </p>
        <p className="flex flex-col">
          <span className="font-bold">예매 시간:</span>
          <div className="pl-6">
            <span> 2024.12.15 11:30</span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default AdminSeatContainer;
