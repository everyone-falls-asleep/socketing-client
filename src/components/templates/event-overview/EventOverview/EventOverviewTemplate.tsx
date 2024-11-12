import EventList from "../../../organisms/event-lists/EventList";
import Container from "../../../layout/Container";
import { Title } from "../../../atoms/title/Title";

interface Event {
  image: string;
  title: string;
}

interface EventOverviewTemplateProps {
  title: string;
  events: Event[];
}

const EventOverviewTemplate = ({
  title,
  events,
}: EventOverviewTemplateProps) => {
  return (
    <Container width="1000px">
      <Title>{title}</Title>
      <EventList events={events} />
    </Container>
  );
};

export default EventOverviewTemplate;
