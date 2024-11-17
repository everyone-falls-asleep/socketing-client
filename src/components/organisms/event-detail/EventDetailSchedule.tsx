import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";
import { useEventDetail } from "../../../store/EventDetailContext";

const EventDetailSchedule = () => {
  const { filteredEvent, selectedDates, setSelectedDates } = useEventDetail();

  if (!filteredEvent) {
    return null;
  }

  const validDates =
    filteredEvent.eventDates?.map((eventDate) => new Date(eventDate.date)) ||
    [];

  const onDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  return (
    <div id="event-schedule" className="p-2">
      <div className="tab-content-title-container">
        <h2 className="tab-content-title">공연 일정</h2>
      </div>
      <ScheduleHeader
        validDates={validDates}
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
      />
      <ScheduleList
        filteredEvent={filteredEvent}
        selectedDates={selectedDates}
      />
    </div>
  );
};

export default EventDetailSchedule;
