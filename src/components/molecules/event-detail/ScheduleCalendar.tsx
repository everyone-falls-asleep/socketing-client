import { useState } from "react";

interface ScheduleCalendarProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  validDates: Date[];
}

const ScheduleCalendar = ({
  selectedDates,
  onDateSelect,
  validDates,
}: ScheduleCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Get the number of days in a given month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dates = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div
      id="calendar-container"
      className="bg-slate-400 w-full flex justify-center"
    >
      <div className="schedule-filter w-96 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousMonth}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            &lt;
          </button>
          <span className="text-gray-800 font-medium text-lg">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={goToNextMonth}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {dates.map((day) => {
            const date = new Date(currentYear, currentMonth, day);
            const isHighlighted = validDates.some(
              (highlightDate) =>
                highlightDate.getDate() === day &&
                highlightDate.getMonth() === currentMonth &&
                highlightDate.getFullYear() === currentYear
            );
            const isSelected = selectedDates.some(
              (d) => d.getTime() === date.getTime()
            );

            return (
              <button
                key={day}
                onClick={() => {
                  if (!isHighlighted) return;
                  const newSelectedDates = isSelected
                    ? selectedDates.filter(
                        (d) => d.getTime() !== date.getTime()
                      )
                    : [...selectedDates, date];
                  onDateSelect(newSelectedDates);
                }}
                className={`
                  flex justify-center items-center p-4 rounded-lg focus:outline-none transition-colors duration-200 text-center text-base font-medium
                  ${isSelected ? "bg-blue-300" : isHighlighted ? "bg-yellow-200" : "bg-gray-200 text-gray-700"}
                  ${isHighlighted ? "hover:bg-yellow-300" : "hover:bg-blue-400"}
                  ${!isHighlighted && "cursor-not-allowed"}
                `}
                disabled={!isHighlighted}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
