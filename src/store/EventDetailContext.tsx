import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Event } from "../types/api/event";

interface EventDetailContextProps {
  filteredEvent: Event | null;
  setFilteredEvent: (event: Event) => void;
  event: Event | null;
  setEvent: (event: Event) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
}

export const EventDetailContext = createContext<EventDetailContextProps>({
  filteredEvent: null,
  setFilteredEvent: () => {},
  event: null,
  setEvent: () => {},
  selectedDates: [],
  setSelectedDates: () => {},
});

export const useEventDetail = () => {
  const context = useContext(EventDetailContext);
  if (!context) {
    throw new Error(
      "useEventDetail must be used within an EventDetailProvider"
    );
  }

  return context;
};

export const EventDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [filteredEvent, setFilteredEvent] = useState<Event | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <EventDetailContext.Provider
      value={{
        filteredEvent,
        setFilteredEvent,
        event,
        setEvent,
        selectedDates,
        setSelectedDates,
      }}
    >
      {children}
    </EventDetailContext.Provider>
  );
};
