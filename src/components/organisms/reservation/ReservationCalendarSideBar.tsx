import React from "react";
import { EventDate } from "../../../types/api/event";

interface DateProps {
  dateData: EventDate[];
}

const ReservationCalendarSideBar: React.FC<DateProps> = ({ dateData }) => {
  return (
    <div className="h-full flex justify-center">
      <div className="p-10 space-y-3">
        <h2 className="text-lg text-center font-bold mb-2">공연 일정</h2>
        {dateData.map((dateData, index) => (
          <button
            key={index}
            className="w-full p-3 font-bold shadow rounded-lg text-center border"
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
