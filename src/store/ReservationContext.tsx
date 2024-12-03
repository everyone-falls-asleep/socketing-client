import React, { createContext, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { useSocketConnection } from "../hooks/useSocketConnection";
import { AreaSocket, Seat, SeatsSelectedResponse } from "../types/api/socket";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

interface ReservationContextType {
  socket: Socket | null;
  isConnected: boolean;
  eventId: string | null;
  setEventId: (id: string) => void;
  eventDateId: string | null;
  setEventDateId: (id: string) => void;
  seatsMap: Map<string, Seat>;
  selectSeats: (seatId: string, areaId: string, numberOfSeats: number) => void;
  currentUserId: string | null;
  selectedSeats: Seat[];
  reserveSeat: (seatIds: string[]) => void;
  numberOfTickets: number;
  setNumberOfTickets: (count: number) => void;
  areasMap: Map<string, AreaSocket>;
  joinArea: (areaId: string) => void;
  setSeatsMap: (seatsMap: Map<string, Seat>) => void;
  currentAreaId: string | null;
  setCurrentAreaId: (currentAreaId: string) => void;
  exitArea: (areaId: string) => void;
}

export const ReservationContext = createContext<ReservationContextType>(
  {} as ReservationContextType
);

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useContext(UserContext);
  const { socket, isConnected } = useSocketConnection();
  const [eventId, setEventId] = useState<string | null>(null);
  const [eventDateId, setEventDateId] = useState<string | null>(null);
  const [seatsMap, setSeatsMap] = useState<Map<string, Seat>>(new Map());
  const [areasMap, setAreasMap] = useState<Map<string, AreaSocket>>(new Map());
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [currentAreaId, setCurrentAreaId] = useState<string | null>(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const updateSeats = (seats: SeatsSelectedResponse[]) => {
    setSeatsMap((prev) => {
      const newMap = new Map(prev);
      setSelectedSeats([]);
      seats.forEach((seat) => {
        const currentSeat = newMap.get(seat.seatId);
        if (currentSeat) {
          setSelectedSeats((prev) => [...prev, currentSeat]);
          newMap.set(seat.seatId, {
            ...currentSeat,
            ...seat,
          });
        }
      });
      return newMap;
    });
  };

  const joinRoom = () => {
    if (!socket || !eventId || !eventDateId) return;
    socket.emit("joinRoom", { eventId, eventDateId });
  };

  const joinArea = (areaId: string) => {
    if (!socket || !eventId || !eventDateId) return;
    socket.emit("joinArea", { eventId, eventDateId, areaId });
  };

  const exitArea = (areaId: string) => {
    if (!socket || !eventId || !eventDateId) return;
    socket.emit("exitArea", { eventId, eventDateId, areaId });
  };

  const selectSeats = (
    seatId: string,
    areaId: string,
    numberOfSeats: number
  ) => {
    if (!socket || !eventId || !eventDateId) return;
    socket.emit("selectSeats", {
      seatId,
      eventId,
      eventDateId,
      areaId,
      numberOfSeats,
    });
  };

  const reserveSeat = (seatIds: string[]) => {
    if (!socket || !eventId || !eventDateId || !currentAreaId || !userId)
      return;
    socket.emit("reserveSeats", {
      seatIds,
      eventId,
      eventDateId,
      areaId: currentAreaId,
      userId,
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      if (socket.id) setCurrentUserId(socket.id);
    });

    socket.on("roomJoined", (data: { areas: AreaSocket[] }) => {
      const newAreasMap = new Map();
      data.areas.forEach((area) => newAreasMap.set(area.id, area));
      setAreasMap(newAreasMap);
    });

    socket.on("areaJoined", (data: { seats: Seat[] }) => {
      const newSeatsMap = new Map();
      data.seats.forEach((seat) => newSeatsMap.set(seat.id, seat));
      setSeatsMap(newSeatsMap);
    });

    socket.on("areaExited", (message) => {
      console.log(message);
    });

    socket.on("seatsSelected", (data: SeatsSelectedResponse[]) => {
      updateSeats(data);
    });

    socket.on("error", (data) => {
      console.error("Error received from server:", data.message);
      toast.error(data.message); //("요청하신 티켓 수 만큼의 좌석이 없습니다.");
    });

    return () => {
      socket.off("connect");
      socket.off("roomJoined");
      socket.off("seatsSelected");
    };
  }, [socket]);

  useEffect(() => {
    if (socket && eventId && eventDateId) {
      joinRoom();
    }
  }, [socket, eventId, eventDateId]);

  const value = {
    socket,
    isConnected,
    eventId,
    setEventId,
    eventDateId,
    setEventDateId,
    seatsMap,
    selectSeats,
    currentUserId,
    selectedSeats,
    reserveSeat,
    numberOfTickets,
    setNumberOfTickets,
    areasMap,
    joinArea,
    setSeatsMap,
    currentAreaId,
    setCurrentAreaId,
    exitArea,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};
