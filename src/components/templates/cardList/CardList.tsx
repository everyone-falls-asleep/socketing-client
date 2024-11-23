import { CustomEventsProps } from "../../../types/api/event";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";

interface CardListProps {
  events: CustomEventsProps[];
}

const CardList = ({ events }: CardListProps) => {
  const navigate = useNavigate();

  const onClickHandler = (id: string) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: CustomEventsProps) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-md active:bg-gray-100 transition-shadow"
          >
            <div className="relative h-[200px]">
              {" "}
              {/* 높이 조정 */}
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 h-[60px]">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex gap-2">
                      <span className="font-semibold">일시:</span>
                      <span>
                        {formatToKoreanDateAndTime(event.eventDates[0].date)}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span className="font-semibold">장소:</span>
                      <span>{event.place}</span>
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    variant="primary"
                    onClick={() => onClickHandler(event.id)}
                  >
                    상세 보기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
