import React from "react";
import { useLocation } from "react-router-dom";
import CardList from "../templates/cardList/CardList";
import MainLayout from "../layout/MainLayout";
import { Event } from "../../types/api/event";

interface SearchResultsState {
  results: Event[]; // `Event`는 이미 정의된 인터페이스로 가정
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { results } = (location.state as SearchResultsState) || { results: [] }; // 전달된 검색 결과

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">검색 결과</h1>
        {results.length > 0 ? (
          <CardList events={results} /> // 검색 결과를 CardList에 전달
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
