import React from "react";
import { EventDate } from "../../../types/api/event";

interface DateProps {
  dateData: EventDate[];
}

const ReservationCalendarSideBar: React.FC<DateProps> = ({ dateData }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold mb-4">공연 일정</h2>
        {dateData.map((dateData, index) => (
          <button
            key={index}
            className="w-full p-3 text-left rounded-lg hover:bg-blue-50 
              transition-colors border hover:border-blue-500"
          >
            {dateData.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendarSideBar;
