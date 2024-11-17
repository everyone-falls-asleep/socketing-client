import React, { PropsWithChildren, createContext, useState } from "react";
import { Seat } from "../types/api/event";

interface ReservationContextType {
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;
  isDateSidebarOpen: boolean;
  toggleDateSidebar: () => void;
  eventId: string | null;
  setEventId: (eventId: string | null) => void;
  eventDateId: string | null;
  setEventDateId: (eventDateId: string | null) => void;
}

export const ReservationContext = createContext<ReservationContextType>({
  selectedSeat: null,
  setSelectedSeat: () => {},
  isDateSidebarOpen: true,
  toggleDateSidebar: () => {},
  eventId: "",
  setEventId: () => {},
  eventDateId: "",
  setEventDateId: () => {},
});

export const ReservationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isDateSidebarOpen, setIsDateSidebarOpen] = useState(true);
  const [eventId, setEventId] = useState<string | null>("");
  const [eventDateId, setEventDateId] = useState<string | null>("");
  const toggleDateSidebar = () => {
    setIsDateSidebarOpen(!isDateSidebarOpen);
  };

  return (
    <ReservationContext.Provider
      value={{
        selectedSeat,
        setSelectedSeat,
        isDateSidebarOpen,
        toggleDateSidebar,
        eventId,
        setEventId,
        eventDateId,
        setEventDateId,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
