import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import Button from "../../atoms/buttons/Button";

interface DateProps {
  dateData: string[];
}

const ReservationCalendarSideBar = ({ dateData }: DateProps) => {
  const { isDateSidebarOpen, toggleDateSidebar } =
    useContext(ReservationContext);
  return (
    <div
      className={`w-1/5 bg-white border-r transition-transform duration-300 absolute h-full
                     ${isDateSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Button
        variant="primary"
        size="sm"
        onClick={() => toggleDateSidebar()}
        className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border rounded-r-lg p-2 shadow-md"
      >
        {isDateSidebarOpen ? "◀" : "▶"}
      </Button>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold mb-4">공연 일정</h2>
        {dateData.map((date, index) => (
          <button
            key={index}
            className="w-full p-3 text-left rounded-lg hover:bg-blue-50 
                         transition-colors border hover:border-blue-500"
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendarSideBar;
