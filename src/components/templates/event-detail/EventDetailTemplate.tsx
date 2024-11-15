import React, { useState } from "react";

interface EventDetailTemplateProps {
  eventHeader: React.ReactNode;
  eventSchedule: React.ReactNode;
  eventAbout: React.ReactNode;
}

const EventDetailTemplate = ({
  eventHeader,
  eventSchedule,
  eventAbout,
}: EventDetailTemplateProps) => {
  const [activeTab, setActiveTab] = useState(0);

  /* Manage tab */
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabContents = [
    /* content 1 */
    <div
      id="event-schedule"
      className="content-container p-2"
      key="event-schedule"
    >
      {eventSchedule && React.cloneElement(eventSchedule as React.ReactElement)}
    </div>,
    /* content 2 */
    <div id="event-about" className="content-container p-2" key="event-about">
      {eventAbout}
    </div>,
  ];

  return (
    <>
      <div>{eventHeader}</div>
      <div id="event-detail-contents" className="p-2">
        {/* Tab navigation */}
        <div className="tabs flex space-x-4 border-b-2 pb-2">
          {["일정", "공연 정보"].map((tab, index) => (
            <button
              key={index}
              className={`tab px-4 py-2 text-lg font-semibold ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="tab-content mt-4">{tabContents[activeTab]}</div>
      </div>
    </>
  );
};

export default EventDetailTemplate;
