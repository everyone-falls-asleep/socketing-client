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
  // const renderSelectedDates = () => {
  //   return selectedDates.length > 0 ? (
  //     selectedDates.map((date) => (
  //       <div key={date.getTime()} className="selected-date-label">
  //         <span className="text-gray-700 text-sm">
  //           {date.toLocaleDateString()}
  //         </span>
  //         <button
  //           className="label-remove-icon"
  //           onClick={() =>
  //             onDateSelect(
  //               selectedDates.filter((d) => d.getTime() !== date.getTime())
  //             )
  //           }
  //         >
  //           ×
  //         </button>
  //       </div>
  //     ))
  //   ) : (
  //     <span className="text-gray-600 text-sm">날짜를 선택해주세요</span>
  //   );
  // };

  return (
    <div id="schedule-header" className="mb-4 rounded-sm w-full">
      {/* <div
        id="shcedule-header-label-container"
        className="flex items-center p-4"
      >
        <div className="flex flex-wrap items-center ml-4">
          {renderSelectedDates()}
        </div>
      </div> */}
      <div
        id="schedule-calendar-container"
        className="w-full flex justify-center"
      >
        <ScheduleCalendar
          validDates={validDates}
          selectedDates={selectedDates}
          onDateSelect={onDateSelect}
        />
      </div>
    </div>
  );
};

export default ScheduleHeader;
