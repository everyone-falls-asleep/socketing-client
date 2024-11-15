import { Event } from "../../types/api/event";
import MainLayout from "../layout/MainLayout";
import EventAbout from "../organisms/event-detail/EventAbout";
import EventHeader from "../organisms/event-detail/EventHeader";
import EventSchedule from "../organisms/event-detail/EventSchedule";
import EventDetailTemplate from "../templates/event-detail/EventDetailTemplate";

const MOCK_SCHEDULES: Event[] = [
  {
    event_id: "1",
    title: "콜드플레이 내한 공연",
    date: [
      "2024-11-11 18:00",
      "2024-11-13 20:00",
      "2024-11-17 18:00",
      "2024-11-18 20:00",
      "2024-11-20 19:00",
    ],
    thumbnail:
      "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
    place: "올림픽 주경기장",
    price: "120000",
    cast: "콜드플레이",
    age_limit: "12",
  },
];

const EventDetailPage = () => {
  return (
    <MainLayout>
      <EventDetailTemplate
        eventHeader={<EventHeader />}
        eventSchedule={<EventSchedule events={MOCK_SCHEDULES} />}
        eventAbout={<EventAbout events={MOCK_SCHEDULES} />}
      ></EventDetailTemplate>
    </MainLayout>
  );
};

export default EventDetailPage;
