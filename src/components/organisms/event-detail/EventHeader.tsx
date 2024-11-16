import { Event } from "../../../types/api/event";

type EventHeaderProps = {
  event: Event;
};

const EventHeader = ({ event }: EventHeaderProps) => {
  return (
    <div
      id="event-header"
      className="w-full h-36 px-28 py-3 flex items-center bg-gray-100"
    >
      <div id="poster-container" className="poster-box bg-amber-200">
        <img
          className="h-full object-contain"
          src={event.thumbnail}
          alt="event poster image"
        />
      </div>
      <div
        id="event-title-container"
        className="h-full bg-gray-300 p-2 flex items-center"
      >
        <h1 className="text-2xl font-bold">{event.title}</h1>
      </div>
    </div>
  );
};

export default EventHeader;
