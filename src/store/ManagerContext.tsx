import React, { createContext, useContext, useState } from "react";
import { Seat, Area } from "../types/api/managers";
import { User } from "../types/api/user";

interface ManagerContextType {
  seats: Seat[];
  setSeats: (seats: Seat[]) => void;
  areas: Area[];
  setAreas: (areas: Area[]) => void;
  svg: string | null;
  setSvg: (svg: string) => void;
  selectedSeat: Seat | null;
  setSelectedSeat: (selectedSeat: Seat | null) => void;
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User | null) => void;
  totalSalesAmount: number | null;
  setTotalSalesAmount: (totalSalesAmount: number | null) => void;
}

export const ManagerContext = createContext<ManagerContextType>(
  {} as ManagerContextType
);

export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("useManagerContext must be used within a ManagerProvider");
  }
  return context;
};

export const ManagerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [svg, setSvg] = useState<string>("");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [totalSalesAmount, setTotalSalesAmount] = useState<number | null>(null);

  const value = {
    seats,
    setSeats,
    areas,
    setAreas,
    svg,
    setSvg,
    selectedSeat,
    setSelectedSeat,
    selectedUser,
    setSelectedUser,
    totalSalesAmount,
    setTotalSalesAmount,
  };

  return (
    <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
  );
};
