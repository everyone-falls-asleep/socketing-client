import EventDetailPage from "../pages/EventDetailPage";
import { EventDetailProvider } from "../../store/EventDetailContext";

export const WrappedEventDetailPage = () => {
  return (
    <EventDetailProvider>
      <EventDetailPage />
    </EventDetailProvider>
  );
};
