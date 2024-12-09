import React, { createContext, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { useSocketConnection } from "../hooks/useSocketConnection";
import {
  AreaSocket,
  ReservedSeatsStatisticResponse,
  Seat,
  SeatsSelectedResponse,
} from "../types/api/socket";
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
  setSelectedSeats: (seats: Seat[]) => void;
  reserveSeat: (seatIds: string[]) => void;
  requestOrder: (userId: string, orderId: string) => void;
  numberOfTickets: number;
  setNumberOfTickets: (count: number) => void;
  areasMap: Map<string, AreaSocket>;
  joinArea: (areaId: string) => void;
  setSeatsMap: (seatsMap: Map<string, Seat>) => void;
  currentAreaId: string | null;
  setCurrentAreaId: (currentAreaId: string) => void;
  exitArea: (areaId: string) => void;
  areaStats: ReservedSeatsStatisticResponse[];
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
  const [areaStats, setAreaStats] = useState<ReservedSeatsStatisticResponse[]>(
    []
  );

  const updateSeats = (seats: SeatsSelectedResponse[]) => {
    setSeatsMap((prev) => {
      const newMap = new Map(prev);
      seats.forEach((seat) => {
        const currentSeat = newMap.get(seat.seatId);
        if (currentSeat) {
          const updatedSeat = {
            ...currentSeat,
            ...seat,
            areaId: currentSeat.areaId,
          };

          newMap.set(seat.seatId, updatedSeat);
          if (seat.selectedBy === socket?.id) {
            setSelectedSeats((prev) => {
              if (!prev.some((s) => s.id === seat.seatId)) {
                return [...prev, updatedSeat];
              }
              return prev.map((s) => (s.id === seat.seatId ? updatedSeat : s));
            });
          } else if (
            currentSeat.selectedBy === socket?.id &&
            seat.selectedBy === null
          ) {
            setSelectedSeats((prev) =>
              prev.filter((s) => s.id !== seat.seatId)
            );
          }
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
    setSelectedSeats([]);
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

  const requestOrder = (userId: string, orderId: string) => {
    if (!socket || !eventId || !eventDateId || !userId || !currentAreaId)
      return;
    socket.emit("requestOrder", {
      userId,
      orderId,
      eventId,
      eventDateId,
      areaId: currentAreaId,
      paymentMethod: "socket_pay",
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

    socket.on("seatsSelected", (data: SeatsSelectedResponse[]) => {
      updateSeats(data);
    });

    socket.on(
      "reservedSeatsStatistic",
      (data: ReservedSeatsStatisticResponse[]) => {
        setAreaStats(data);
      }
    );

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
    setSelectedSeats,
    reserveSeat,
    requestOrder,
    numberOfTickets,
    setNumberOfTickets,
    areasMap,
    joinArea,
    setSeatsMap,
    currentAreaId,
    setCurrentAreaId,
    exitArea,
    areaStats,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};
