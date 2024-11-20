import MainLayout from "../layout/MainLayout";
import CardList from "../templates/cardList/CardList";
import MainBanner from "../templates/mainBanner/MainBanner";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { CustomEventsProps, EventsResponse } from "../../types/api/event";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";
import dayjs from "dayjs";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const now = new Date().getTime();
  const navigate = useNavigate();
  const useEvents = createResourceQuery<EventsResponse>(
    "all-events",
    fetchAllEvents
  );

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noEventData}</p>;

  const eventData = data.data;

  const getTimeLeft = (ticketingStartTime: number) => {
    const now = new Date().getTime();
    const difference = ticketingStartTime - now;

    if (difference <= 0) {
      return "예매가 시작되었습니다!";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days > 0 ? `${days}일 ` : ""}${hours}시간 ${minutes}분 ${seconds}초`;
  };

  // 티켓팅 오픈 예정 공연 목록
  const impendingTicketingEvents = eventData
    .filter((event) => event.ticketingStartTime)
    .map((event) => ({
      ...event,
      ticketingStartTime: dayjs(event.ticketingStartTime)
        .tz("Asia/Seoul")
        .valueOf(),
    }))
    .filter(
      (event) =>
        event.ticketingStartTime && event.ticketingStartTime >= now - 60 * 1000
    )
    .sort((a, b) => {
      return a.ticketingStartTime - b.ticketingStartTime;
    });

  // 예매 진행 중인 공연 목록
  const ongoingTicketingEvents: CustomEventsProps[] = eventData
    .filter((event) => event.ticketingStartTime)
    .map((event) => ({
      ...event,
      ticketingStartTime: dayjs(event.ticketingStartTime)
        .tz("Asia/Seoul")
        .valueOf(),
    }))
    .filter((event) => event.ticketingStartTime < now)
    .sort((a, b) => {
      return a.ticketingStartTime - b.ticketingStartTime;
    });

  // 필터링된 이벤트를 MainBanner에 전달
  const nextTicketingEvent = eventData
    .filter((event) => event.ticketingStartTime)
    .map((event) => ({
      ...event,
      ticketingStartTime: dayjs(event.ticketingStartTime)
        .tz("Asia/Seoul")
        .valueOf(),
    }))
    .filter((event) => event.ticketingStartTime > now)
    .sort((a, b) => a.ticketingStartTime - b.ticketingStartTime)
    .slice(0, 1);

  return (
    <MainLayout>
      <MainBanner event={nextTicketingEvent[0]} now={now} />

      <div className="px-6 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            티켓팅 오픈 예정 공연
          </h2>
          <div className="flex flex-col gap-4">
            {impendingTicketingEvents.length > 0 ? (
              impendingTicketingEvents.map((event: CustomEventsProps) => (
                <div
                  key={event.id}
                  className="bg-white flex items-center justify-between px-8 py-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-32 flex-shrink-0">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            티켓팅
                          </span>
                          <span>
                            {formatToKoreanDateAndTime(
                              event.ticketingStartTime
                            )}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            장소
                          </span>
                          <span>{event.place}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            출연
                          </span>
                          <span>{event.cast}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button
                      className={`px-6 py-3 font-bold rounded-lg transition-colors ${
                        event.ticketingStartTime > now
                          ? "bg-gray-400 cursor-not-allowed" // 티켓팅 시작 전
                          : "bg-rose-500 hover:bg-rose-600" // 티켓팅 시작 후
                      }`}
                      onClick={() => navigate(`/event/${event.id}`)}
                      disabled={event.ticketingStartTime > now}
                    >
                      {event.ticketingStartTime > now ? "준비중" : "상세보기"}
                    </button>
                    <div className="text-sm text-gray-500">
                      티켓팅까지 {getTimeLeft(event.ticketingStartTime)}
                      오픈 시간:{" "}
                      {formatToKoreanDateAndTime(event.ticketingStartTime)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                  티켓팅 오픈 예정인 공연이 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 예매 진행 중인 공연 목록 */}
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          예매 진행 중인 공연
        </h2>
        <CardList events={ongoingTicketingEvents}></CardList>
      </div>
    </MainLayout>
  );
};

export default MainPage;
