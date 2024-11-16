import { useState } from "react";
import { EventDate } from "../../../types/api/event";
import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";

interface ScheduleProps {
  dates: EventDate[];
}

const EventSchedule = ({ dates }: ScheduleProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  /* Manage Valid Date by useState in case tickets are sold out */
  const [validDates] = useState<Set<string>>(
    new Set(
      dates.flatMap(
        (date) =>
          // event.eventDates.map((eventDate) =>
          new Date(date.date).toDateString()
        //)
      )
    )
  );

  /* Handle date selection */
  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  // Filter events based on selected dates
  const filteredSchedules = dates.filter((date) =>
    dates.some((eventDate) => {
      const eventDateObj = new Date(eventDate.date);
      console.log(date);
      return selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === eventDateObj.getDate() &&
          selectedDate.getMonth() === eventDateObj.getMonth() &&
          selectedDate.getFullYear() === eventDateObj.getFullYear()
      );
    })
  );

  return (
    <div id="event-schedule" className="content-container p-2">
      <div id="event-content-title" className="text-start p-2 bg-red-300">
        <h2 className="text-2xl font-bold bg-white">공연 일정</h2>
      </div>

      <ScheduleHeader
        validDates={Array.from(validDates)}
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
      />
      <ScheduleList schedules={filteredSchedules} />
    </div>
  );
};

export default EventSchedule;
