import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import EventDetailTemplate from "../templates/event-detail/EventDetailTemplate";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { useParams } from "react-router-dom";
import { useEventDetail } from "../../store/EventDetailContext";
import EventDetailHeader from "../organisms/event-detail/EventDetailHeader";
import EventDetailSchedule from "../organisms/event-detail/EventDetailSchedule";
import EventDetailAbout from "../organisms/event-detail/EventDetailAbout";
import { fetchErrorMessages } from "../../constants/errorMessages";

const EventDetailPage = () => {
  const { id } = useParams();
  const { setEvent, setFilteredEvent } = useEventDetail();

  const useEvent = createResourceQuery<SingleEventResponse>(
    "single-event",
    fetchOneEvent
  );
  const { data, isLoading, isError } = useEvent(id ?? "default-id");

  useEffect(() => {
    if (data?.data) {
      const eventData = data.data;
      setEvent(eventData);

      const filteredEvent = {
        ...eventData,
        eventDates:
          eventData.eventDates?.filter((eventDate) =>
            eventData.eventDates?.some(
              (date) =>
                new Date(eventDate.date).getTime() ===
                new Date(date.date).getTime()
            )
          ) || [],
      };

      setFilteredEvent(filteredEvent);
    }
  }, [data, setEvent, setFilteredEvent]);

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noEventData}</p>;

  return (
    <MainLayout>
      <EventDetailTemplate
        eventDetailHeader={<EventDetailHeader />}
        eventDetailSchedule={<EventDetailSchedule />}
        eventDetailAbout={<EventDetailAbout />}
      />
    </MainLayout>
  );
};

export default EventDetailPage;
