import MainLayout from "../layout/MainLayout";
import EventAbout from "../organisms/event-detail/EventAbout";
import EventHeader from "../organisms/event-detail/EventHeader";
import EventSchedule from "../organisms/event-detail/EventSchedule";
import EventDetailTemplate from "../templates/event-detail/EventDetailTemplate";
import { useQuery } from "@tanstack/react-query";
import { SingleEventResponse } from "../../types/api/event";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const { id } = useParams();

  const useEvent = (event_id: string) => {
    return useQuery<SingleEventResponse, Error>({
      queryKey: ["single-event", event_id],
      queryFn: ({ queryKey }) => {
        const [, event_id] = queryKey as [string, string];
        return fetchOneEvent(event_id);
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const { data, isLoading, isError, error } = useEvent(id ?? "default-id");

  if (isLoading) {
    console.log(data);
    return <p>이벤트를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!data?.data) {
    return <p>오류 발생: 공연 정보를 불러올 수 없습니다.</p>;
  }
  const eventData = data.data;

  return (
    <MainLayout>
      <EventDetailTemplate
        eventHeader={<EventHeader event={eventData} />}
        eventSchedule={<EventSchedule dates={eventData.eventDates} />}
        eventAbout={<EventAbout event={eventData} />}
      ></EventDetailTemplate>
    </MainLayout>
  );
};

export default EventDetailPage;
