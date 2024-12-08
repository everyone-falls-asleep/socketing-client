import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReservationLayout from "../layout/ReservationLayout";
import MainLayout from "../layout/MainLayout";
import ReservationUpperEvent from "../organisms/reservation/ReservationUpperEvent";
import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
import { ReservationContext } from "../../store/ReservationContext";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";
import ReservationSeatInfo from "../organisms/reservation/ReservationSeatInfo";

const ReservationPage: React.FC = () => {
  const { eventId: urlEventId, eventDateId: urlEventDateId } = useParams();
  const { setEventId, setEventDateId, isConnected, setNumberOfTickets } =
    useContext(ReservationContext);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { numberOfTickets?: number };
    if (state?.numberOfTickets) {
      setNumberOfTickets(state.numberOfTickets);
    }
  }, [location.state, setNumberOfTickets]);

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
    <MainLayout>
      <ReservationLayout
        topContent={<ReservationUpperEvent {...eventData.data} />}
        centerContent={<ReservationSeatContainer svg={eventData.data.svg} />}
        rightTopContent={<ReservationMinimap />}
        rightBottomContent={<ReservationSeatInfo {...eventData.data} />}
      />
    </MainLayout>
  );
};

export default ReservationPage;
