import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FourSectionLayout from "../layout/FourSectionLayout";
import ReservationUpperEvent from "../organisms/reservation/ReservationUpperEvent";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
import ReservationSeatInfo from "../organisms/reservation/ReservationSeatInfo";
import { ReservationContext } from "../../store/ReservationContext";
import { fetchAllSeats, fetchOneEvent } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import { SingleEventResponse, SeatResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";

const ReservationPage: React.FC = () => {
  const { setEventId, setEventDateId, setSocket } =
    useContext(ReservationContext);
  const { eventId, eventDateId } = useParams();
  const { socket: newSocket } = useSocketConnection();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] =
    React.useState<boolean>(true);

  useEffect(() => {
    if (newSocket) {
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [newSocket, setSocket]);

  useEffect(() => {
    if (eventId) setEventId(eventId);
    if (eventDateId) setEventDateId(eventDateId);
  }, [eventId, eventDateId, setEventId, setEventDateId]);

  const useEvent = createResourceQuery<SingleEventResponse>(
    "single-event",
    fetchOneEvent
  );
  const useSeat = createResourceQuery<SeatResponse>("seats", fetchAllSeats);

  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
  } = useEvent(eventId ?? "default-id");
  const {
    data: seatsData,
    isLoading: seatsLoading,
    isError: seatsError,
  } = useSeat(eventId ?? "default-id");

  if (eventLoading || seatsLoading)
    return <p>{fetchErrorMessages.isLoading}</p>;
  if (eventError || seatsError) return <p>{fetchErrorMessages.general}</p>;
  if (!eventData?.data) return <p>{fetchErrorMessages.noEventData}</p>;
  if (!seatsData?.data) return <p>{fetchErrorMessages.noSeatsData}</p>;
  if (!eventData.data.svg) return <div>{fetchErrorMessages.noSvgData}</div>;

  return (
    <FourSectionLayout
      topContent={<ReservationUpperEvent {...eventData.data} />}
      leftSidebarContent={
        <ReservationCalendarSideBar dateData={eventData.data.eventDates} />
      }
      centerContent={
        <ReservationSeatContainer
          seatsData={seatsData.data}
          svg={eventData.data.svg}
        />
      }
      rightTopContent={<ReservationMinimap />}
      rightBottomContent={<ReservationSeatInfo />}
      isLeftSidebarOpen={isLeftSidebarOpen}
      toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
    />
  );
};

export default ReservationPage;
