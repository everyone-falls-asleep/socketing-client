import React, { createContext, useState, useEffect, useCallback } from "react";
import { Socket } from "socket.io-client";
import { useSocketConnection } from "../hooks/useSocketConnection";

// Types
interface Reservation {
  id: string;
  eventDate: {
    id: string;
    date: string;
  };
}

interface Seat {
  id: string;
  cx: number;
  cy: number;
  area: number;
  row: number;
  number: number;
  reservations: Reservation[];
  selectedBy: string | null;
  updatedAt: string | null;
  expirationTime: string | null;
}

interface ReservationContextType {
  // Socket
  socket: Socket | null;
  isConnected: boolean;

  // Room/Event Info
  eventId: string | null;
  setEventId: (id: string) => void;
  eventDateId: string | null;
  setEventDateId: (id: string) => void;

  // Seats State
  seats: Seat[];
  setSeats: (seats: Seat[]) => void;
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;

  // Actions
  joinRoom: (eventId: string, eventDateId: string) => void;
  selectSeat: (seatId: string) => void;
}

const defaultContext: ReservationContextType = {
  socket: null,
  isConnected: false,
  eventId: null,
  setEventId: () => {},
  eventDateId: null,
  setEventDateId: () => {},
  seats: [],
  setSeats: () => {},
  selectedSeat: null,
  setSelectedSeat: () => {},
  joinRoom: () => {},
  selectSeat: () => {},
};

export const ReservationContext =
  createContext<ReservationContextType>(defaultContext);

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Socket Connection
  const { socket, isConnected } = useSocketConnection();

  // Basic State
  const [eventId, setEventId] = useState<string | null>(null);
  const [eventDateId, setEventDateId] = useState<string | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Room Join Handler
  const joinRoom = useCallback(
    (eventId: string, eventDateId: string) => {
      if (!socket) return;

      socket.emit("joinRoom", { eventId, eventDateId });
    },
    [socket]
  );

  // Seat Selection Handler
  const selectSeat = useCallback(
    (seatId: string) => {
      if (!socket || !eventId || !eventDateId) return;

      socket.emit("selectSeat", {
        seatId,
        eventId,
        eventDateId,
      });
    },
    [socket, eventId, eventDateId]
  );

  // Socket Event Listeners
  useEffect(() => {
    if (!socket) return;

    // Room Joined Handler
    socket.on("roomJoined", (data: { message: string; seats: Seat[] }) => {
      console.log(data.message);
      setSeats(data.seats);
    });

    // Seat Selected Handler
    socket.on(
      "seatSelected",
      (data: {
        seatId: string;
        selectedBy: string | null;
        updatedAt: string;
      }) => {
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === data.seatId
              ? {
                  ...seat,
                  selectedBy: data.selectedBy,
                  updatedAt: data.updatedAt,
                }
              : seat
          )
        );
      }
    );

    // Cleanup
    return () => {
      socket.off("roomJoined");
      socket.off("seatSelected");
    };
  }, [socket]);

  // Auto Join Room Effect
  useEffect(() => {
    if (socket && eventId && eventDateId) {
      joinRoom(eventId, eventDateId);
    }
  }, [socket, eventId, eventDateId, joinRoom]);

  const value = {
    socket,
    isConnected,
    eventId,
    setEventId,
    eventDateId,
    setEventDateId,
    seats,
    setSeats,
    selectedSeat,
    setSelectedSeat,
    joinRoom,
    selectSeat,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};
