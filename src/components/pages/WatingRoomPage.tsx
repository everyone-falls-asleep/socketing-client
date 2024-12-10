import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import { useQueueContext } from "../../store/QueueContext";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { SingleEventResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";

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

  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
  } = useEvent(urlEventId ?? "");

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

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white flex flex-col items-center">
        <div
          className="w-full py-4 h-48"
          style={{
            backgroundImage: eventData.data.thumbnail,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/40">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-4 h-40">
              {/* 포스터 이미지 */}
              <div className="mt-4 md:mt-0 md:mr-4">
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
        <div className="w-full max-w-4xl p-6">
          {/* 단계별 텍스트 */}
          <div className="flex justify-between mt-10 md:mt-4 text-sm">
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
          <p className="mt-2 p-3 md:text-lg">
            {/* {currentStage === 1 &&
                "대기실에 입장하셨습니다. 잠시 후 입장 대기가 시작됩니다."} */}
            {progress < 90 &&
              "현재 입장 대기 중입니다. 좌석 선택을 위해 준비해주세요!"}
            {progress > 90 && "곧 입장이 시작됩니다!"}
          </p>
          <h2 className="mt-4 text-2xl font-bold">
            나의 대기 순서: {myPosition}
          </h2>
          {/* {currentStage === 1 && (
            <p className="mt-4 text-rose-400 text-xl font-bold">12 MIN</p>
          )} */}
          {/* {currentStage === 2 && ( */}
          <p className="mt-2 text-rose-400 text-xl font-bold">
            총 대기 인원: {totalWaiting}
          </p>
          {/* )} */}
        </div>
        {/* 좌석 배치도 (SeatMap) */}
        <div className="mt-16 px-8">
          <h2 className="text-xl font-bold text-center mb-4">Seat Map</h2>
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            {/* 이미지 삽입 부분 */}
            <img
              src="https://www.mfac.or.kr/web/images/sub/seat_a1_2022.png" // 여기에 실제 좌석 배치도 이미지 경로 삽입
              alt="Seat Map"
              className="object-contain h-full w-full"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WaitingRoomPage;
