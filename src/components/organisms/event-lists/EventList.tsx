import EventCard from "../../molecules/event-card/EventCard";
import Grid from "../../layout/Grid";
import { useNavigate } from "react-router-dom";
import { Event } from "../../../types/api/event";

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const onClickHandler = (eventId: string) => {
    navigate(`/reservation/${eventId}`);
  };
  return (
    <Grid orientation="vertical">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onClick={() => onClickHandler(event._id)}
        />
      ))}
    </Grid>
  );
};

export default EventList;
