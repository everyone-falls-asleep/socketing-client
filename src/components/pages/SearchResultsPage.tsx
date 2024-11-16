import React from "react";
import { useParams } from "react-router-dom";
import CardList from "../templates/cardList/CardList";
import MainLayout from "../layout/MainLayout";
import { Event } from "../../types/api/event";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { useQuery } from "@tanstack/react-query";
import { EventsResponse } from "../../types/api/event";

const SearchResultsPage: React.FC = () => {
  const searchTerm = useParams<{ searchTerm: string }>().searchTerm ?? ""; // URL 경로에서 검색어 가져오기
  const lowerCaseSearchTerm = searchTerm?.toLowerCase() || "";

  const { data, isLoading, isError, error } = useQuery<EventsResponse, Error>({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    console.log(data);
    return <p>이벤트를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!data?.data) {
    return <p>오류 발생: 데이터를 불러올 수 없습니다.</p>;
  }

  // 검색 필터링 함수
  const filterEvents = data.data.filter((event: Event) => {
    return (
      event.title.toLowerCase().includes(lowerCaseSearchTerm) || // 제목 필터링
      event.place.toLowerCase().includes(lowerCaseSearchTerm) || // 장소 필터링
      event.cast.toLowerCase().includes(lowerCaseSearchTerm) // 출연진 필터링
    );
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {searchTerm
            ? `"${searchTerm}"에 대한 검색 결과`
            : "검색어가 입력되지 않았습니다."}
        </h1>
        {filterEvents.length > 0 ? (
          <CardList events={filterEvents} /> // 검색 결과를 CardList에 전달
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
