import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import {
  formatDateToKoreanDate,
  formatDateToKoreanTime,
} from "../../../utils/dateUtils";

interface ScheduleCardProps {
  eventId: string;
  eventDateId: string;
  date: Date;
}

const ScheduleCard = ({ eventId, eventDateId, date }: ScheduleCardProps) => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate(`/reservation/${eventId}/${eventDateId}`);
  };

  return (
    <div className="event-card h-22 flex items-center justify-between px-8 py-4 mx-2 mb-2 rounded-lg border shadow-lg hover:bg-gray-100 transition">
      <div className="schedule-info flex gap-4">
        <div
          id="schedule-date"
          className=" text-lg font-semibold text-gray-800 flex items-end"
        >
          <p>{formatDateToKoreanDate(date)}</p>
        </div>
        <div className="schedule-time text-base text-gray-600 flex items-end">
          <p>{formatDateToKoreanTime(date)}</p>
        </div>
      </div>

      <Button variant="primary" onClick={handleScheduleClick}>
        예약하기
      </Button>
    </div>
  );
};

export default ScheduleCard;
