import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import EventDetailTemplate from "../templates/event-detail/EventDetailTemplate";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { useParams } from "react-router-dom";
import { useEventDetail } from "../../store/EventDetailContext";
import { fetchErrorMessages } from "../../constants/errorMessages";
import EventDetailHeader from "../organisms/event-detail/EventDetailHeader";
import EventDetailScheduleTab from "../organisms/event-detail/EventDetailScheduleTab";
import EventDetailAboutTab from "../organisms/event-detail/EventDetailAboutTab";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { EventFriendProvider } from "../../store/EventFriendContext";
import { QueueProvider } from "../../store/QueueContext";

dayjs.extend(utc);
dayjs.extend(timezone);

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
                dayjs(eventDate.date).tz("Asia/Seoul").valueOf() ===
                dayjs(date.date).tz("Asia/Seoul").valueOf()
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
    <QueueProvider>
      <MainLayout>
        <EventDetailTemplate
          eventDetailHeader={<EventDetailHeader />}
          eventDetailScheduleTab={
            <EventFriendProvider>
              <EventDetailScheduleTab />
            </EventFriendProvider>
          }
          eventDetailAboutTab={<EventDetailAboutTab />}
        />
      </MainLayout>
    </QueueProvider>
  );
};

export default EventDetailPage;
