import { useNavigate } from "react-router-dom";
import ScheduleCard from "./ScheduleCard";
import { Event, EventDate } from "../../../types/api/event";

interface ScheduleListProps {
  filteredEvent: Event;
  selectedDates: Date[];
}

const ScheduleList = ({ filteredEvent, selectedDates }: ScheduleListProps) => {
  const navigate = useNavigate();

  const handleScheduleClick = (eventId: string) => {
    navigate(`/reservation/${eventId}`);
  };

  const filteredSchedules =
    selectedDates.length === 0
      ? filteredEvent.eventDates
      : filteredEvent.eventDates.filter((schedule: EventDate) => {
          const scheduleDate = new Date(schedule.date);
          return selectedDates.some((selectedDate) => {
            return (
              selectedDate.getDate() === scheduleDate.getDate() &&
              selectedDate.getMonth() === scheduleDate.getMonth() &&
              selectedDate.getFullYear() === scheduleDate.getFullYear()
            );
          });
        });

  return (
    <div className="schedule-list">
      {filteredSchedules.length > 0 ? (
        filteredSchedules.map((schedule: EventDate) => (
          <ScheduleCard
            key={schedule.id}
            date={new Date(schedule.date)}
            onClick={() => handleScheduleClick(filteredEvent.id)}
          />
        ))
      ) : (
        <div>선택된 날짜에 해당하는 공연 일정이 없습니다.</div>
      )}
    </div>
  );
};

export default ScheduleList;
