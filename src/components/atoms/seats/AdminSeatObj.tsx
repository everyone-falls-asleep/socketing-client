import React from "react";
import { getUserInfo } from "../../../api/users/usersApi";
import { toast } from "react-toastify";

interface SelectedAdminSeatObjProps {
  user_id: string;
}

const SelectedAdminSeatObj: React.FC<SelectedAdminSeatObjProps> = ({
  user_id,
}) => {
  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    void fetchUserInfo(user_id);
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const data = await getUserInfo(userId);
      const email = data.data?.email;
      if (email) {
        const name = email.split("@")[0];
        toast.success(`예매자: ${name}`);
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="15"
        fill="#563ede"
        stroke="#1F2937"
        strokeWidth="2"
        onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

const AdminSeatObj: React.FC = () => {
  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("예매되지 않은 좌석입니다.");
  };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="15"
        fill="#FFFFFF"
        stroke="#1F2937"
        strokeWidth="2"
        onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

export { AdminSeatObj, SelectedAdminSeatObj };
