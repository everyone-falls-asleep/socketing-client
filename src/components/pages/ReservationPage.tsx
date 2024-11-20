import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FourSectionLayout from "../layout/FourSectionLayout";
import ReservationUpperEvent from "../organisms/reservation/ReservationUpperEvent";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
import { ReservationContext } from "../../store/ReservationContext";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";

const ReservationPage: React.FC = () => {
  const { eventId: urlEventId, eventDateId: urlEventDateId } = useParams();
  const { setEventId, setEventDateId, isConnected } =
    useContext(ReservationContext);

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] =
    React.useState<boolean>(true);

  // Event Data Query
  const useEvent = createResourceQuery<SingleEventResponse>(
    "single-event",
    fetchOneEvent
  );

  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
  } = useEvent(urlEventId ?? "default-id");

  // Set Event and EventDate IDs in Context when URL params change
  useEffect(() => {
    if (urlEventId) setEventId(urlEventId);
    if (urlEventDateId) setEventDateId(urlEventDateId);
  }, [urlEventId, urlEventDateId, setEventId, setEventDateId]);

  // Loading States
  if (eventLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (eventError) return <p>{fetchErrorMessages.general}</p>;
  if (!eventData?.data) return <p>{fetchErrorMessages.noEventData}</p>;
  if (!eventData.data.svg) return <div>{fetchErrorMessages.noSvgData}</div>;
  if (!isConnected) return <p>Connecting to server...</p>;

  return (
    <FourSectionLayout
      topContent={<ReservationUpperEvent {...eventData.data} />}
      leftSidebarContent={
        <ReservationCalendarSideBar dateData={eventData.data.eventDates} />
      }
      centerContent={<ReservationSeatContainer svg={eventData.data.svg} />}
      rightTopContent={<ReservationMinimap />}
      rightBottomContent={<div>reservation info</div>}
      isLeftSidebarOpen={isLeftSidebarOpen}
      toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
    />
  );
};

export default ReservationPage;
