import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueueContext } from "../../store/QueueContext";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchOneEvent, fetchAllSeats } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import MySeatContainer from "../organisms/seat-container/MySeatContainer";
import { OrderSeatResponse } from "../../types/api/order";

const stages = ["대기열 진입", "입장"]; //["로비", "대기실", "입장 대기", "매표소 입장"];
const WaitingRoomPage = () => {
  const { eventId: urlEventId, eventDateId: urlEventDateId } = useParams();
  const {
    setEventId,
    setEventDateId,
    isConnected,
    isTurn,
    myPosition,
    totalWaiting,
    selectedSeatIds,
  } = useQueueContext();
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // const [currentStage, setCurrentStage] = useState(1); // 현재 단계
  const [progress, setProgress] = useState(0); // 진행률 (0% ~ 100%)

  useEffect(() => {
    const state = location.state as { numberOfTickets?: number };
    if (state?.numberOfTickets) {
      setNumberOfTickets(state.numberOfTickets);
    }
  }, [location.state, setNumberOfTickets]);

  const useEvent = createResourceQuery<SingleEventResponse>(
    "single-event",
    fetchOneEvent
  );

  const useSeats = createResourceQuery<OrderSeatResponse>(
    `fetch-all-seats`,
    fetchAllSeats
  );

  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
  } = useEvent(urlEventId ?? "");

  const {
    data: seatData,
    isLoading: seatLoading,
    isError: seatError,
  } = useSeats(urlEventId ?? "");

  useEffect(() => {
    if (urlEventId) setEventId(urlEventId);
    if (urlEventDateId) setEventDateId(urlEventDateId);
  }, [urlEventId, urlEventDateId, setEventId, setEventDateId]);

  const enterReservationPage = () => {
    navigate(`/reservation/${urlEventId}/${urlEventDateId}`, {
      state: { numberOfTickets },
    });
  };

  useEffect(() => {
    if (isTurn) {
      enterReservationPage();
    }
  }, [isTurn]);

  useEffect(() => {
    if (myPosition && totalWaiting) {
      setProgress(((totalWaiting - (myPosition - 1)) / totalWaiting) * 100);
    }
  }, [myPosition, totalWaiting]);

  if (eventLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (eventError) return <p>{fetchErrorMessages.general}</p>;
  if (!eventData?.data) return <p>{fetchErrorMessages.noEventData}</p>;
  if (!eventData.data.svg) return <div>{fetchErrorMessages.noSvgData}</div>;
  if (!isConnected) return <p>Connecting to queue...</p>;

  if (seatLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (seatError) return <p>{fetchErrorMessages.general}</p>;
  if (!seatData?.data) return <p>{fetchErrorMessages.noSeatsData}</p>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="relative w-full h-36">
        {/* 배경 이미지 */}

        <div
          id="background-image"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${eventData.data.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: "0.5",
          }}
        />
        <div className="absolute inset-0 flex items-center bg-black/40">
          <div className="flex items-center px-10 md:px-28 max-w-4xl">
            {/* 포스터 이미지 */}
            <div className="hidden md:block w-24 mr-4">
              <img
                src={eventData.data.thumbnail}
                alt="공연 포스터"
                className="h-32 object-contain rounded-lg shadow-md"
              />
            </div>
            {/* 텍스트 정보 */}
            <div className="text-white">
              <h1 className="text-2xl font-bold">{eventData.data.title}</h1>
              <p className="text-sm mt-3">
                {formatToKoreanDateAndTime(eventData.data.eventDates[0].date)}
              </p>
              <p className="text-sm mt-1">장소: {eventData.data.place}</p>
            </div>
          </div>
        </div>
      </div>
      {/*{/* 상단 진행 상태 */}
      <div className="relative w-full max-w-4xl p-6">
        <div>
          {/* 단계별 텍스트 */}
          <div className="flex justify-between text-sm">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`text-center ${"text-rose-400 font-semibold"}`}
              >
                {stage}
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-2 bg-gray-700 rounded">
            <div
              className="absolute h-2 bg-rose-400 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* 대기실/큐 상태 */}
        <div className="flex flex-col items-center justify-center">
          <p className="mt-2 px-5 md:text-lg text-center whitespace-pre-line">
            {progress < 90 &&
              `현재 입장 대기 중입니다.
              좌석 선택을 위해 준비해주세요!`}
            {progress > 90 && "곧 입장이 시작됩니다!"}
          </p>
          {myPosition ? (
            <h2 className="mt-4 text-2xl font-bold">
              현재 순서: {myPosition} 번
            </h2>
          ) : (
            <div className="h-6" />
          )}
          {totalWaiting && (
            <p className="mt-2 text-rose-400 text-xl font-bold">
              {totalWaiting}명이 뒤에 대기 중입니다.
            </p>
          )}
        </div>
        {/* 좌석 배치도 (SeatMap) */}
        <div className="mt-2 px-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center my-3">
            실시간 좌석 예매 현황
          </h2>
          <div className="bg-black rounded-lg shadow-lg md:w-[50vw] md:h-[50vh] flex justify-center">
            <MySeatContainer
              svg={eventData.data.svg}
              seats={seatData.data}
              selectedSeatIds={selectedSeatIds}
              reservedByMe={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomPage;
