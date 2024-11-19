import ScheduleCard from "./ScheduleCard";
import { Event, EventDate } from "../../../types/api/event";

interface ScheduleListProps {
  filteredEvent: Event;
  selectedDates: Date[];
}

const ScheduleList = ({ filteredEvent, selectedDates }: ScheduleListProps) => {
  const filteredSchedules =
    selectedDates.length === 0
      ? [...filteredEvent.eventDates].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      : filteredEvent.eventDates
          .filter((schedule: EventDate) => {
            const scheduleDate = new Date(schedule.date);
            return selectedDates.some((selectedDate) => {
              return (
                selectedDate.getDate() === scheduleDate.getDate() &&
                selectedDate.getMonth() === scheduleDate.getMonth() &&
                selectedDate.getFullYear() === scheduleDate.getFullYear()
              );
            });
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

  return (
    <div className="schedule-list">
      {filteredSchedules.length > 0 ? (
        filteredSchedules.map((schedule: EventDate) => (
          <ScheduleCard
            key={schedule.id}
            eventId={filteredEvent.id}
            eventDateId={schedule.id}
            date={new Date(schedule.date)}
          />
        ))
      ) : (
        <div>선택된 날짜에 해당하는 공연 일정이 없습니다.</div>
      )}
    </div>
  );
};

export default ScheduleList;
