import { useState, useEffect, useCallback } from "react";
import { SeatStatus } from "../types/api/socket";
import { SocketType } from "../types/api/socket";

interface UseSeatStatusProps {
  socket: SocketType | null;
  seatId: string;
}

export const useSeatStatus = ({ socket, seatId }: UseSeatStatusProps) => {
  const [status, setStatus] = useState<SeatStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleSeatUpdate = (updatedStatus: unknown) => {
      const status = updatedStatus as SeatStatus;
      if (status.seatId === seatId) {
        setStatus(status);
      }
    };

    const handleError = (errorData: unknown) => {
      const errorInfo = errorData as { message: string; seatId: string };
      if (errorInfo.seatId === seatId) {
        setError(errorInfo.message);
      }
    };

    socket.on("seat:update", handleSeatUpdate);
    socket.on("seat:error", handleError);

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

  const holdSeat = useCallback(() => {
    if (!socket) return;
    socket.emit("seat:temporary_hold", seatId);
  }, [socket, seatId]);

  return {
    status,
    error,
    reserveSeat,
    holdSeat,
  };
};
