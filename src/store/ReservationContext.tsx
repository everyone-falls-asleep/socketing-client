import React, { PropsWithChildren, createContext, useState } from "react";
import { Seat } from "../types/api/event";

interface ReservationContextType {
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;
  isDateSidebarOpen: boolean;
  toggleDateSidebar: () => void;
}

export const ReservationContext = createContext<ReservationContextType>({
  selectedSeat: null,
  setSelectedSeat: () => {},
  isDateSidebarOpen: true,
  toggleDateSidebar: () => {},
});

export const ReservationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isDateSidebarOpen, setIsDateSidebarOpen] = useState(true);

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
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
