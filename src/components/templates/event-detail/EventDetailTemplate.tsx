import TabLayout from "../../layout/tab-menu/TabLayout";

interface EventDetailTemplateProps {
  eventDetailHeader: React.ReactNode;
  eventDetailScheduleTab: React.ReactNode;
  eventDetailAboutTab: React.ReactNode;
}

const EventDetailTemplate = ({
  eventDetailHeader,
  eventDetailScheduleTab,
  eventDetailAboutTab,
}: EventDetailTemplateProps) => {
  const tabContents = [
    <div key="event-schedule" id="event-schedule">
      {eventDetailScheduleTab}
    </div>,
    <div key="event-about" id="event-about">
      {eventDetailAboutTab}
    </div>,
  ];

  return (
    <div>
      <div className="relative w-full h-36">{eventDetailHeader}</div>
      <div id="event-detail-contents" className="px-20 py-5">
        <TabLayout
          className=""
          tabs={["일정", "공연 정보"]}
          tabContents={tabContents}
        />
      </div>
    </div>
  );
};

export default EventDetailTemplate;
