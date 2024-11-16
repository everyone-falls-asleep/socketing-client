import React, { useState } from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search-results/${encodeURIComponent(searchQuery)}`); // URL 경로에 검색어 포함
      setSearchQuery(""); // 검색창 초기화
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
