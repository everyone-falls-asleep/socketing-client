import EventList from "../../organisms/event-lists/EventList";
import Container from "../../layout/Container";
import Title from "../../atoms/titles/title/Title";
import { Event } from "../../../types/api/event";

export const MOCK_EVENTS: Event[] = [
  {
    event_id: "1",
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
    event_id: "2",
    title: "김혜다 단독 콘서트",
    date: ["2024-12-06 18:00PM", "2024-12-07 18:00PM"],
    thumbnail:
      "https://i.namu.wiki/i/ULEPOWPdbcmUlLgfR3if48VFAcqiwdya-LVBipi6HAYUZDVa0YeVbqpCnCsLoHSdQmpEYwBEAL1yQQxPXgBu_w.webp",
    place: "카이스트 문지캠퍼스 강의동 407호",
    price: "119119",
    cast: "김혜다",
    age_limit: "30세",
  },
  {
    event_id: "3",
    title: "지킬앤하이드",
    date: ["2024-12-01 18:00PM"],
    thumbnail: "//ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
    place: "샤롯데 씨어터",
    price: "99000",
    cast: "뮤지컬 캐스트",
    age_limit: "15세",
  },
  {
    event_id: "4",
    title: "다비치 콘서트",
    date: ["2024-12-20 18:00PM"],
    thumbnail: "//ticketimage.interpark.com/Play/image/large/24/24016415_p.gif",
    place: "블루스퀘어 마스터카드 홀",
    price: "77000",
    cast: "다비치",
    age_limit: "12세",
  },
  {
    event_id: "5",
    title: "로이킴 콘서트",
    date: ["2024-12-15 18:00PM"],
    thumbnail: "//ticketimage.interpark.com/Play/image/large/24/24014448_p.gif",
    place: "코엑스 아티움",
    price: "85000",
    cast: "로이킴",
    age_limit: "12세",
  },
  {
    event_id: "6",
    title: "김장훈 AI 콘서트",
    date: ["2024-12-25 18:00PM"],
    thumbnail: "//ticketimage.interpark.com/Play/image/large/24/24016511_p.gif",
    place: "올림픽 체조 경기장",
    price: "110000",
    cast: "김장훈",
    age_limit: "12세",
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
