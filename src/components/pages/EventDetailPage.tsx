import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import EventDetailTemplate from "../templates/event-detail/EventDetailTemplate";
import { useQuery } from "@tanstack/react-query";
import { SingleEventResponse } from "../../types/api/event";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { useParams } from "react-router-dom";
import {
  useEventDetail,
  EventDetailProvider,
} from "../../store/EventDetailContext";
import EventDetailHeader from "../organisms/event-detail/EventDetailHeader";
import EventDetailSchedule from "../organisms/event-detail/EventDetailSchedule";
import EventDetailAbout from "../organisms/event-detail/EventDetailAbout";

const EventDetailPage = () => {
  const { id } = useParams();
  const { setEvent, setFilteredEvent } = useEventDetail();

  const useEvent = (event_id: string) => {
    return useQuery<SingleEventResponse, Error>({
      queryKey: ["single-event", event_id],
      queryFn: () => fetchOneEvent(event_id),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const { data, isLoading, isError, error } = useEvent(id ?? "default-id");

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

  if (isLoading) {
    return <p>이벤트를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!data?.data) {
    return <p>오류 발생: 공연 정보를 불러올 수 없습니다.</p>;
  }

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

const WrappedEventDetailPage = () => {
  return (
    <EventDetailProvider>
      <EventDetailPage />
    </EventDetailProvider>
  );
};

export default WrappedEventDetailPage;
