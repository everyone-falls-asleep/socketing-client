import EventCard from "../../molecules/event-card/EventCard";
import Grid from "../../layout/Grid";

interface Event {
  image: string;
  title: string;
}

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  return (
    <Grid orientation="vertical">
      {events.map((event, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3">
          <EventCard image={event.image} title={event.title} />
        </div>
      ))}
    </Grid>
  );
};

export default EventList;
