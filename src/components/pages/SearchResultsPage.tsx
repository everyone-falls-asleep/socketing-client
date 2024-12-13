import { useParams } from "react-router-dom";
import CardList from "../templates/cardList/CardList";
import MainLayout from "../layout/MainLayout";
import { Event } from "../../types/api/event";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { EventsResponse } from "../../types/api/event";
import { fetchErrorMessages } from "../../constants/errorMessages";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

dayjs.extend(utc);
dayjs.extend(timezone);

const SearchResultsPage = () => {
  const searchTerm = useParams<{ searchTerm: string }>().searchTerm ?? ""; // URL 경로에서 검색어 가져오기
  const lowerCaseSearchTerm = searchTerm?.toLowerCase() || "";

  const useEvents = createResourceQuery<EventsResponse>(
    "all-events",
    fetchAllEvents
  );

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!data?.data)
    return <ErrorPage errorMessage={fetchErrorMessages.noEventData} />;

  // 검색 필터링 함수
  const filterEvents = data.data.filter((event: Event) => {
    return (
      event.title.toLowerCase().includes(lowerCaseSearchTerm) || // 제목 필터링
      event.place.toLowerCase().includes(lowerCaseSearchTerm) || // 장소 필터링
      event.cast.toLowerCase().includes(lowerCaseSearchTerm) // 출연진 필터링
    );
  });

  const processedEvents = filterEvents.map((event) => ({
    ...event,
    ticketingStartTime: event.ticketingStartTime
      ? dayjs(event.ticketingStartTime).tz("Asia/Seoul").valueOf()
      : 0, // 또는 다른 기본값
  }));

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {searchTerm
            ? `"${searchTerm}"에 대한 검색 결과`
            : "검색어가 입력되지 않았습니다."}
        </h1>
        {filterEvents.length > 0 ? (
          <CardList events={processedEvents} /> // 검색 결과를 CardList에 전달
        ) : (
          <p className="text-center text-gray-600">
            검색어와 관련된 공연이 없습니다.
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchResultsPage;
