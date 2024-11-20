import React from "react";

interface SelectedAdminSeatObjProps {
  user_id: string;
}

const SelectedAdminSeatObj: React.FC<SelectedAdminSeatObjProps> = ({
  user_id,
}) => {
  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(user_id);
  };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="15"
        fill="#9CA3AF"
        stroke="#1F2937"
        strokeWidth="2"
        onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

const AdminSeatObj: React.FC = () => {
  // const handleSeatClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   console.log(seatData.user_id);
  // };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="15"
        fill="#FFFFFF"
        stroke="#1F2937"
        strokeWidth="2"
        // onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

export { AdminSeatObj, SelectedAdminSeatObj };
