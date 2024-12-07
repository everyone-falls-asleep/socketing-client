import React from "react";
import { getUserInfo } from "../../../api/users/usersApi";
import { Seat } from "../../../types/api/managers";
import { useManagerContext } from "../../../store/ManagerContext";
import { toast } from "react-toastify";

interface SelectedManagerSeatObjProps {
  user_id: string;
  seatData: Seat;
}

const SelectedManagerSeatObj: React.FC<SelectedManagerSeatObjProps> = ({
  user_id,
  seatData,
}) => {
  const { setSelectedSeat, setSelectedUser } = useManagerContext();

  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    void fetchUserInfo(user_id);
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const data = await getUserInfo(userId);
      const email = data.data?.email;
      if (email) {
        if (data.data) {
          setSelectedUser(data.data);
          setSelectedSeat(seatData);
        }
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="10"
        fill="#9CA3AF"
        stroke="#1F2937"
        strokeWidth="2"
        onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

const ManagerSeatObj: React.FC = () => {
  const { setSelectedSeat, setSelectedUser } = useManagerContext();

  const handleSeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("예매되지 않은 좌석입니다.");
    setSelectedSeat(null);
    setSelectedUser(null);
  };

  return (
    <g className="seat-group">
      {/* Base Seat Circle */}
      <circle
        r="10"
        fill="#FFFFFF"
        stroke="#1F2937"
        strokeWidth="2"
        onClick={handleSeatClick}
        className="seat transition-colors duration-200"
      />
    </g>
  );
};

export { ManagerSeatObj, SelectedManagerSeatObj };
