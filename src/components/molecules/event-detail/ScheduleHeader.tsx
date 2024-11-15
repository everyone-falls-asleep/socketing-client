import { useState } from "react";
import ScheduleCalendar from "./scheduleCalendar";

interface ScheduleHeaderProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  validDates: string[];
}

const ScheduleHeader = ({
  selectedDates,
  onDateSelect,
  validDates,
}: ScheduleHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Convert validDates (strings) to Date objects
  const validDatesAsDate = validDates.map((dateStr) => new Date(dateStr));

  const renderSelectedDates = () => {
    return selectedDates.length > 0 ? (
      selectedDates.map((date) => (
        <div
          key={date.getTime()}
          className="selected-date-label flex items-center bg-blue-100 rounded-full px-3 py-1 mr-2 shadow-sm"
        >
          <span className="text-gray-700 text-sm">
            {date.toLocaleDateString()}
          </span>
          <button
            className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() =>
              onDateSelect(
                selectedDates.filter((d) => d.getTime() !== date.getTime())
              )
            }
          >
            ×
          </button>
        </div>
      ))
    ) : (
      <span className="text-gray-600 text-sm">선택된 날짜가 없습니다.</span>
    );
  };

  return (
    <div
      id="filtered-dates-container"
      className="relative border border-gray-300 mb-4 rounded-lg bg-gray-100 h-20 w-full flex items-center p-4"
    >
      <div
        id="toggle-nav"
        className="cursor-pointer w-1/12 text-center py-2 text-white bg-slate-400 rounded-md"
        onClick={handleToggleClick}
      >
        {isDropdownOpen ? "닫기" : "달력 열기"}
      </div>

      <div className="flex flex-wrap items-center ml-4">
        {renderSelectedDates()}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-full z-10">
          <ScheduleCalendar
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
            validDates={validDatesAsDate} // Pass Date[] to ScheduleCalendar
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleHeader;
