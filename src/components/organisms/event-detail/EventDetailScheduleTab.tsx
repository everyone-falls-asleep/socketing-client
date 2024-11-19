import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";
import { useEventDetail } from "../../../store/EventDetailContext";

const EventDetailScheduleTab = () => {
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
    <>
      <div className="tab-content-title-container">
        <h2 className="tab-content-title">공연 일정</h2>
      </div>
      <div className="flex px-4 gap-10">
        <div className="w-[50%]">
          <ScheduleHeader
            validDates={validDates}
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        </div>
        <div className="w-[50%] pt-5">
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
      </div>
    </>
  );
};

export default EventDetailScheduleTab;
