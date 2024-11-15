import Button from "../../atoms/buttons/Button";
import { Event } from "../../../types/api/event";

interface ScheduleCardProps {
  schedule: Event; // Entire schedule, including all the details
  dateStr: string; // The specific date to display
  onClick?: () => void; // Optional click handler
}

const ScheduleCard = ({ schedule, dateStr, onClick }: ScheduleCardProps) => {
  const { place } = schedule;

  const [dateString, timeString] = dateStr.split(" ");
  const formattedDate = new Date(dateString).toLocaleDateString();
  const formattedTime = timeString;

  return (
    <div
      className="event-card h-28 flex items-center justify-between p-4 m-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div className="schedule-info flex gap-4">
        <div className="schedule-date text-2xl font-semibold text-gray-800">
          {formattedDate}
        </div>
        <div className="schedule-time text-xl text-gray-600">
          {formattedTime}
        </div>
        <div className="schedule-place text-base text-gray-500">{place}</div>
      </div>

      <Button variant="primary">예약하기</Button>
    </div>
  );
};

export default ScheduleCard;
