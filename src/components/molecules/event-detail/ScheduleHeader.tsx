import ScheduleCalendar from "./ScheduleCalendar";

interface ScheduleHeaderProps {
  validDates: Date[];
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
}

const ScheduleHeader = ({
  validDates,
  selectedDates,
  onDateSelect,
}: ScheduleHeaderProps) => {
  const renderSelectedDates = () => {
    return selectedDates.length > 0 ? (
      selectedDates.map((date) => (
        <div key={date.getTime()} className="selected-date-label">
          <span className="text-gray-700 text-sm">
            {date.toLocaleDateString()}
          </span>
          <button
            className="label-remove-icon"
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
      <span className="text-gray-600 text-sm">날짜를 선택해주세요</span>
    );
  };

  return (
    <div className="border border-gray-300 mb-4 rounded-lg bg-gray-100 w-full">
      <div className="flex items-center p-4">
        <div className="flex flex-wrap items-center ml-4">
          {renderSelectedDates()}
        </div>
      </div>

      <ScheduleCalendar
        validDates={validDates}
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default ScheduleHeader;
