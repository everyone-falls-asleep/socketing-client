import React, { useState } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";
import { MOCK_EVENTS } from "../event-overview/EventOverviewTemplate";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  // 검색 필터링 함수
  const filterEvents = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return MOCK_EVENTS.filter(
      (event) =>
        event.title.toLowerCase().includes(lowerCaseQuery) || // 제목 필터링
        event.place.toLowerCase().includes(lowerCaseQuery) || // 장소 필터링
        event.cast.toLowerCase().includes(lowerCaseQuery) // 출연진 필터링
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const filtered = filterEvents(searchQuery);
      navigate("/search-results", { state: { results: filtered } });
      setSearchQuery("");
    } else {
      alert("검색어를 입력해주세요");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
      <a href="/" className="text-2xl font-bold">
        SocKeTing
      </a>
      <div className="flex  items-center w-1/2 bg-white rounded-lg overflow-hidden">
        <Input
          type="text"
          placeholder="공연 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-r-none text-gray-700 outline-none"
        />
        <button
          onClick={handleSearch}
          className="p-3 w-[100px] bg-rose-400 rounded-r-lg hover:bg-rose-500"
        >
          🔍
        </button>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/join");
          }}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
