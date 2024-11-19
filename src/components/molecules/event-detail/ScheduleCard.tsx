import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";

interface ScheduleCardProps {
  eventId: string;
  eventDateId: string;
  date: Date;
}

const ScheduleCard = ({ eventId, eventDateId, date }: ScheduleCardProps) => {
  const formattedDate = date.toISOString().replace("T", " ").slice(0, 16);

  const year = formattedDate.slice(0, 4);
  const month = formattedDate.slice(5, 7);
  const day = formattedDate.slice(8, 10);
  const hour = formattedDate.slice(11, 13);
  const minute = formattedDate.slice(14, 16);

  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate(`/reservation/${eventId}/${eventDateId}`);
  };

  return (
    <div className="event-card h-28 flex items-center justify-between px-8 py-4 mx-2 mb-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition">
      <div className="schedule-info flex gap-4">
        <div
          id="schedule-date"
          className=" text-2xl font-semibold text-gray-800"
        >
          {year}년 {month}월 {day}일
        </div>
        <div className="schedule-time text-xl text-gray-600">
          {hour}시 {minute}분
        </div>
      </div>

      <Button variant="primary" onClick={handleScheduleClick}>
        예약하기
      </Button>
    </div>
  );
};

export default ScheduleCard;
