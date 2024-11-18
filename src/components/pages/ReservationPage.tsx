import ReservationUpperEvent from "../organisms/reservation/ResevationUpperEvent";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
import ReservationSeatInfo from "../organisms/reservation/ReservationSeatInfo";
import { useContext, useEffect } from "react";
import { ReservationContext } from "../../store/ReservationContext";
import MainLayout from "../layout/MainLayout";
import { fetchAllSeats, fetchOneEvent } from "../../api/events/eventsApi";
import { SingleEventResponse } from "../../types/api/event";
import { SeatResponse } from "../../types/api/event";
import { useParams } from "react-router-dom";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";

const ReservationPage = () => {
  const { socket } = useSocketConnection();
  const { isDateSidebarOpen, setEventId, setEventDateId } =
    useContext(ReservationContext);
  const { eventId, eventDateId } = useParams();

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

  const svgString = eventData.data.svg;

  return (
    <MainLayout>
      <div className="h-screen flex flex-col">
        {/* 상단 공연 정보  */}
        <ReservationUpperEvent {...eventData.data}></ReservationUpperEvent>
        {/* 하단 섹션 (2/3) */}
        <div className="flex flex-1 relative">
          {/* 날짜 선택 사이드바 (1/5) */}
          <div
            className={`${isDateSidebarOpen ? "ml-1/5" : ""} w-2/5 bg-gray-50 transition-all`}
          >
            <ReservationCalendarSideBar dateData={eventData.data.eventDates} />
          </div>

          {/* 좌석 선택 영역 (3/5) */}
          <ReservationSeatContainer
            seatsData={seatsData.data}
            socket={socket}
            svg={svgString}
          />

          {/* 우측 사이드바 (1/5) */}
          <div className="w-1/5 border-l bg-white">
            {/* 미니맵 (1/3) */}
            <ReservationMinimap />

            {/* 좌석 정보 및 예매 버튼 (2/3) */}
            <ReservationSeatInfo />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReservationPage;
