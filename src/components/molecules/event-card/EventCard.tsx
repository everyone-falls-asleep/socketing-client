import Image from "../../atoms/images/Image";
import { Event } from "../../../types/api/event";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const { thumbnail, title, eventDates, place } = event;

  return (
    <div
      className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <Image src={thumbnail} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>일시: {eventDates[0].date}</p>
          <p>장소: {place}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
