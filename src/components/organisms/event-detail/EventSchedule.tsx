import { useState } from "react";
import { Event } from "../../../types/api/event";
import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";

interface EventProps {
  events: Event[];
}

const EventSchedule = ({ events }: EventProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  /* Manage Valid Date by useState in case tickets are sold out */
  const [validDates] = useState<Set<string>>(
    new Set(
      events.flatMap((event) =>
        event.eventDates.map((eventDate) =>
          new Date(eventDate.date).toDateString()
        )
      )
    )
  );

  /* Handle date selection */
  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  // Filter events based on selected dates
  const filteredSchedules = events.filter((event) =>
    event.eventDates.some((eventDate) => {
      const eventDateObj = new Date(eventDate.date);
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
