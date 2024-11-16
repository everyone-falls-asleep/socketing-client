import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { NewEventResponseData } from "../types/api/event";

interface EventCreateContextProps {
  event: NewEventResponseData | null;
  setEvent: (event: NewEventResponseData) => void;
}

export const EventCreateContext = createContext<EventCreateContextProps>({
  event: null,
  setEvent: () => {},
});

export const useEventCreate = () => {
  const context = useContext(EventCreateContext);
  if (!context) {
    throw new Error(
      "useEventCreate must be used within an EventCreateProvider"
    );
  }

  return context;
};

export const EventCreateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [event, setEvent] = useState<NewEventResponseData | null>(null);

  return (
    <EventCreateContext.Provider value={{ event, setEvent }}>
      {children}
    </EventCreateContext.Provider>
  );
};
