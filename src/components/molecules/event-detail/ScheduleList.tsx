import { useNavigate } from "react-router-dom";
import { Event } from "../../../types/api/event";
import ScheduleCard from "./ScheduleCard";

interface ScheduleListProps {
  schedules: Event[];
}

const ScheduleList = ({ schedules }: ScheduleListProps) => {
  const navigate = useNavigate();

  const handleScheduleClick = (eventId: string) => {
    navigate(`/reservation/${eventId}`);
  };

  return (
    <div className="schedule-container flex flex-col gap-2">
      {schedules.map((schedule) => {
        return schedule.eventDates.map((eventDate, index) => (
          <ScheduleCard
            key={`${schedule.id}-${index}`} // 수정된 부분: schedule.id 사용
            schedule={schedule}
            dateStr={eventDate.date} // 수정된 부분: eventDate.date 사용
            onClick={() => handleScheduleClick(schedule.id)} // 수정된 부분: schedule.id 사용
          />
        ));
      })}
    </div>
  );
};

export default ScheduleList;