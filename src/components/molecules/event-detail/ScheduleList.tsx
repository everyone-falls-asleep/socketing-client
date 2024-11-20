import ScheduleCard from "./ScheduleCard";
import { Event, EventDate } from "../../../types/api/event";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleListProps {
  filteredEvent: Event;
  selectedDates: Date[];
}

const ScheduleList = ({ filteredEvent, selectedDates }: ScheduleListProps) => {
  const filteredSchedules =
    selectedDates.length === 0
      ? [...filteredEvent.eventDates].sort(
          (a, b) =>
            dayjs(a.date).tz("Asia/Seoul").valueOf() -
            dayjs(b.date).tz("Asia/Seoul").valueOf()
        )
      : filteredEvent.eventDates
          .filter((schedule: EventDate) => {
            const scheduleDate = dayjs(schedule.date).tz("Asia/Seoul");
            return selectedDates.some((selectedDate) => {
              const selected = dayjs(selectedDate).tz("Asia/Seoul");
              return (
                selected.date() === scheduleDate.date() &&
                selected.month() === scheduleDate.month() &&
                selected.year() === scheduleDate.year()
              );
            });
          })
          .sort(
            (a, b) =>
              dayjs(a.date).tz("Asia/Seoul").valueOf() -
              dayjs(b.date).tz("Asia/Seoul").valueOf()
          );

  return (
    <div className="schedule-list">
      {filteredSchedules.length > 0 ? (
        filteredSchedules.map((schedule: EventDate) => (
          <ScheduleCard
            key={schedule.id}
            eventId={filteredEvent.id}
            eventDateId={schedule.id}
            date={dayjs(schedule.date).tz("Asia/Seoul").toDate()}
            ticketingStartTime={dayjs(filteredEvent.ticketingStartTime)
              .tz("Asia/Seoul")
              .valueOf()}
          />
        ))
      ) : (
        <div>선택된 날짜에 해당하는 공연 일정이 없습니다.</div>
      )}
    </div>
  );
};

export default ScheduleList;
