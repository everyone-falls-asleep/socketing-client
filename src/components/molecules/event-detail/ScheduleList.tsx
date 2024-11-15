import { useNavigate } from "react-router-dom";
import { Event } from "../../../types/api/event";
import ScheduleCard from "./scheduleCard";

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
        return schedule.date.map((dateStr, index) => (
          <ScheduleCard
            key={`${schedule.event_id}-${index}`}
            schedule={schedule}
            dateStr={dateStr}
            onClick={() => handleScheduleClick(schedule.event_id)}
          />
        ));
      })}
    </div>
  );
};

export default ScheduleList;
