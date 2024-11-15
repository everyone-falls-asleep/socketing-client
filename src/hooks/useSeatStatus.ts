import { useState, useEffect, useCallback } from "react";
import { Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  SeatStatus,
} from "../types/api/socket";

interface UseSeatStatusProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  seatId: string;
}

export const useSeatStatus = ({ socket, seatId }: UseSeatStatusProps) => {
  const [status, setStatus] = useState<SeatStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleSeatUpdate = (updatedStatus: SeatStatus) => {
      if (updatedStatus.seatId === seatId) {
        setStatus(updatedStatus);
      }
    };

    const handleError = (errorData: { message: string; seatId: string }) => {
      if (errorData.seatId === seatId) {
        setError(errorData.message);
      }
    };

    socket.on("seat:update", handleSeatUpdate);
    socket.on("seat:error", handleError);

    // 좌석 모니터링 시작
    socket.emit("seat:watch", seatId);

    return () => {
      socket.off("seat:update", handleSeatUpdate);
      socket.off("seat:error", handleError);
      socket.emit("seat:unwatch", seatId);
    };
  }, [socket, seatId]);

  const reserveSeat = useCallback(() => {
    if (!socket) return;
    socket.emit("seat:reserve", seatId);
  }, [socket, seatId]);

  return {
    status,
    error,
    reserveSeat,
  };
};
