import React, { useState } from "react";
import TabMenu from "../../molecules/menus/TabMenu";

interface EventDetailTemplateProps {
  eventDetailHeader: React.ReactNode;
  eventDetailSchedule: React.ReactNode;
  eventDetailAbout: React.ReactNode;
}

const EventDetailTemplate = ({
  eventDetailHeader,
  eventDetailSchedule,
  eventDetailAbout,
}: EventDetailTemplateProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabContents = [
    <div key="event-schedule" id="event-schedule" className="p-2">
      {eventDetailSchedule}
    </div>,
    <div key="event-about" id="event-about" className="p-2">
      {eventDetailAbout}
    </div>,
  ];

  return (
    <>
      <div>{eventDetailHeader}</div>
      <div id="event-detail-contents" className="p-2">
        <TabMenu
          tabs={["일정", "공연 정보"]}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="tab-content mt-4">{tabContents[activeTab]}</div>
      </div>
    </>
  );
};

export default EventDetailTemplate;
