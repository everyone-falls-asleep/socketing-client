import React, { useState } from "react";
import { EventDate } from "../../../types/api/event";

interface DateProps {
  dateData: EventDate[];
}

const ReservationCalendarSideBar: React.FC<DateProps> = ({ dateData }) => {
  // 버튼별 상태를 관리하는 배열
  const [clickedStates, setClickedStates] = useState<boolean[]>(
    Array(dateData.length).fill(false)
  );

  const handleClick = (index: number) => {
    // 클릭된 버튼의 상태만 변경
    const newClickedStates = clickedStates.map((state, idx) =>
      idx === index ? true : false
    );
    setClickedStates(newClickedStates);
  };

  return (
    <div className="h-full flex justify-center">
      <div className="p-10 space-y-3">
        <h2 className="text-lg text-center font-bold mb-2">공연 일정</h2>
        {dateData.map((dateData, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-full p-3 font-bold shadow rounded-lg text-center border  ${
              clickedStates[index]
                ? "bg-gray-300"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {new Date(dateData.date)
              .toISOString()
              .replace("T", " ")
              .slice(0, 16)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendarSideBar;
