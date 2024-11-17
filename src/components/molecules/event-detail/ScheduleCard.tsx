import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import dayjs from "dayjs";

interface ScheduleCardProps {
  eventId: string;
  eventDateId: string;
  date: Date;
}

const ScheduleCard = ({ eventId, eventDateId, date }: ScheduleCardProps) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  const formattedTime = dayjs(date).format("HH:mm");

  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate(`/reservation/${eventId}/${eventDateId}`);
  };

  return (
    <div className="event-card h-28 flex items-center justify-between p-4 m-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition">
      <div className="schedule-info flex gap-4">
        <div className="schedule-date text-2xl font-semibold text-gray-800">
          {formattedDate}
        </div>
        <div className="schedule-time text-xl text-gray-600">
          {formattedTime}
        </div>
      </div>

      <Button variant="primary" onClick={handleScheduleClick}>
        예약하기
      </Button>
    </div>
  );
};

export default ScheduleCard;
