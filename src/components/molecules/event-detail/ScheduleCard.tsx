import Button from "../../atoms/buttons/Button";
import dayjs from "dayjs";

interface ScheduleCardProps {
  date: Date;
  onClick?: () => void;
}

const ScheduleCard = ({ date, onClick }: ScheduleCardProps) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  const formattedTime = dayjs(date).format("HH:mm");

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
      </div>

      <Button variant="primary">예약하기</Button>
    </div>
  );
};

export default ScheduleCard;
