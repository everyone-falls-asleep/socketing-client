import React, { PropsWithChildren, createContext, useState } from "react";
import { Seat } from "../types/api/event";
import { createMockSocket } from "../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface ReservationContextType {
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;
  isDateSidebarOpen: boolean;
  toggleDateSidebar: () => void;
  eventId: string | null;
  setEventId: (eventId: string | null) => void;
  eventDateId: string | null;
  setEventDateId: (eventDateId: string | null) => void;
  socket: MockSocketType | null;
  setSocket: (socket: MockSocketType | null) => void;
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
  socket: null,
  setSocket: () => {},
});

export const ReservationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isDateSidebarOpen, setIsDateSidebarOpen] = useState(true);
  const [eventId, setEventId] = useState<string | null>("");
  const [eventDateId, setEventDateId] = useState<string | null>("");
  const [socket, setSocket] = useState<MockSocketType | null>(null);
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
        socket,
        setSocket,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
