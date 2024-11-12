import Header from "../templates/header/Header";
import EventOverviewTemplate from "../templates/event-overview/EventOverviewTemplate";

const events = [
  {
    title: "콜드 플레이 내한 공연",
    image:
      "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
  },
  {
    title: "두아리파 내한 공연",
    image:
      "https://ticketimage.interpark.com/Play/image/large/24/24007623_p.gif",
  },
  {
    title: "크러쉬 공연",
    image:
      "https://ticketimage.interpark.com/Play/image/large/24/24015807_p.gif",
  },
];

function MainPage() {
  return (
    <>
      <Header />
      <EventOverviewTemplate title="공연 목록" events={events} />
    </>
  );
}

export default MainPage;
