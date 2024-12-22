import EventCard from "../../molecules/event-card/EventCard";
import Grid from "../../layout/Grid";
import { useNavigate } from "react-router";
import { Event } from "../../../types/api/event";

export interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    void navigate(`/reservation/`);
  };
  return (
    <Grid orientation="vertical">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onClickHandler()}
        />
      ))}
    </Grid>
  );
};

export default EventList;
