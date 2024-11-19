import { EventListProps } from "../../organisms/event-lists/EventList";
import { useNavigate } from "react-router-dom";

const CardList = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const onClickHandler = (id: string) => {
    navigate(`/event/${id}`);
  };
  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">곧 열릴 공연들</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onClickHandler(event.id)}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  일시:{" "}
                  {new Date(event.eventDates[0].date)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 16)}
                </p>
                <p>장소: {event.place}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
