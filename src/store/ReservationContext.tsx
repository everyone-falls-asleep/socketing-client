import React, { createContext, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { useSocketConnection } from "../hooks/useSocketConnection";
import { Seat, SeatsSelectedResponse } from "../types/api/socket";
import { toast } from "react-toastify";

interface ReservationContextType {
  socket: Socket | null;
  isConnected: boolean;
  eventId: string | null;
  setEventId: (id: string) => void;
  eventDateId: string | null;
  setEventDateId: (id: string) => void;
  seatsMap: Map<string, Seat>;
  selectSeats: (seatId: string, numberOfSeats: number) => void;
  currentUserId: string | null;
  selectedSeats: Seat[];
  reserveSeat: (seatId: string, eventId: string, eventDateId: string) => void;
  numberOfTickets: number;
  setNumberOfTickets: (count: number) => void;
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
  const { socket, isConnected } = useSocketConnection();
  const [eventId, setEventId] = useState<string | null>(null);
  const [eventDateId, setEventDateId] = useState<string | null>(null);
  const [seatsMap, setSeatsMap] = useState<Map<string, Seat>>(new Map());
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
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
    socket?.emit("joinRoom", { eventId, eventDateId });
  };

  const selectSeats = (seatId: string, numberOfSeats: number) => {
    if (!socket || !eventId || !eventDateId) return;

    socket.emit("selectSeats", { seatId, eventId, eventDateId, numberOfSeats });
  };

  const reserveSeat = (seatId: string) => {
    if (!socket || !seatId || !eventId || !eventDateId) return;
    socket.emit("reserveSeat", { seatId, eventId, eventDateId });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      if (socket.id) setCurrentUserId(socket.id);
    });

    socket.on("roomJoined", (data: { seats: Seat[] }) => {
      const newSeatsMap = new Map();
      data.seats.forEach((seat) => newSeatsMap.set(seat.id, seat));
      setSeatsMap(newSeatsMap);
    });

    socket.on("seatsSelected", (data: SeatsSelectedResponse[]) => {
      updateSeats(data);
    });

    socket.on("error", (data) => {
      console.error("Error received from server:", data.message);
      toast.error("요청하신 티켓 수 만큼의 좌석이 없습니다.");
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
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};
