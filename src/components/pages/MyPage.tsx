import EventOverviewTemplate from "../templates/event-overview/EventOverviewTemplate";
import Header from "../templates/header/Header";

const Mypage = () => {
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

  return (
    <>
      <Header></Header>
      <EventOverviewTemplate
        title="예매 목록 (구매자)"
        events={events}
      ></EventOverviewTemplate>
      <EventOverviewTemplate
        title="주최 목록 (판매자)"
        events={events}
      ></EventOverviewTemplate>
    </>
  );
};

export default Mypage;
