import EventCard from "../../molecules/event-card/EventCard";
import Grid from "../../layout/Grid";
import { useNavigate } from "react-router-dom";
import { Event } from "../../../types/api/event";

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/reservation/`);
  };
  return (
    <Grid orientation="vertical">
      {events.map((event) => (
        <EventCard
          key={event.event_id}
          event={event}
          onClick={() => onClickHandler()}
        />
      ))}
    </Grid>
  );
};

export default EventList;
