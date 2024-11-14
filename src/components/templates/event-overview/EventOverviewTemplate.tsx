import EventList from "../../organisms/event-lists/EventList";
import Container from "../../layout/Container";
import Title from "../../atoms/titles/title/Title";
import { Event } from "../../../types/api/event";

const MOCK_EVENTS: Event[] = [
  {
    _id: "1",
    title: "콜드플레이 내한 공연",
    date: ["2024-12-22 18:00PM", "2024-12-23 18:00PM", "2024-12-24 18:00PM"],
    thumbnail:
      "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
    place: "올림픽 주경기장",
    price: "129000",
    cast: "콜드플레이",
    age_limit: "12세",
  },
  {
    _id: "2",
    title: "김혜다 단독 콘서트",
    date: ["2024-12-06 18:00PM", "2024-12-07 18:00PM"],
    thumbnail:
      "https://i.namu.wiki/i/ULEPOWPdbcmUlLgfR3if48VFAcqiwdya-LVBipi6HAYUZDVa0YeVbqpCnCsLoHSdQmpEYwBEAL1yQQxPXgBu_w.webp",
    place: "카이스트 문지캠퍼스 강의동 407호",
    price: "119119",
    cast: "김혜다",
    age_limit: "30세",
  },
];

const EventOverviewTemplate = () => {
  return (
    <Container width="1000px">
      <Title>공연 목록</Title>
      <EventList events={MOCK_EVENTS} />
    </Container>
  );
};

export default EventOverviewTemplate;
