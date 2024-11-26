import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import {
  formatDateToKoreanDate,
  formatDateToKoreanTime,
} from "../../../utils/dateUtils";
import { toast } from "react-toastify";
import { useCurrentTime } from "../../../hooks/useCurrentTime";
import { useMockEventFriendContext } from "../../../mocks/MockEventFriendContext";

interface ScheduleCardProps {
  eventId: string;
  eventDateId: string;
  date: Date;
  ticketingStartTime?: number;
}

const ScheduleCard = ({
  eventId,
  eventDateId,
  date,
  ticketingStartTime,
}: ScheduleCardProps) => {
  const navigate = useNavigate();
  const now = useCurrentTime();

  const isTicketingStarted = ticketingStartTime && now >= ticketingStartTime;
  const isDisabled = !isTicketingStarted;
  const { eventFriends } = useMockEventFriendContext();

  const checkLogin = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.success("예약 페이지에 접근하기 위해서는 로그인이 필요합니다.");
      return false;
    }
    return true;
  };

  const handleDefaultReservationClick = () => {
    if (!checkLogin()) return;

    navigate(`/reservation/${eventId}/${eventDateId}`);
  };

  const handleAdjacentReservationClick = () => {
    if (!checkLogin()) return;

    if (eventFriends.length < 1) {
      toast.error("연석 친구를 먼저 등록해 주세요.");
      return;
    }

    navigate(`/reservation/${eventId}/${eventDateId}`, {
      state: { ticketsToReserve: eventFriends.length },
    });
  };

  return (
    <div className="event-card h-20 flex items-center justify-between px-8 py-4 mx-2 mb-2 rounded-lg border shadow-lg hover:bg-gray-100 transition">
      <div className="schedule-info flex gap-4">
        <div
          id="schedule-date"
          className="text-lg font-semibold text-gray-800 flex items-end"
        >
          <p>{formatDateToKoreanDate(date)}</p>
        </div>
        <div className="schedule-time text-base text-gray-600 flex items-end">
          <p>{formatDateToKoreanTime(date)}</p>
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          variant="primary"
          onClick={handleDefaultReservationClick}
          disabled={isDisabled}
        >
          {isDisabled ? "준비중" : "예약하기"}
        </Button>
        <Button
          variant="primary"
          onClick={handleAdjacentReservationClick}
          disabled={isDisabled}
        >
          {isDisabled ? "준비 중" : "연석 예매하기"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCard;
