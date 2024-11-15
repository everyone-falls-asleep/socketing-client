import { useState, useEffect, useCallback } from "react";
import { SeatStatus } from "../types/api/socket";
import { createMockSocket } from "../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface UseSeatStatusProps {
  socket: MockSocketType | null;
  seatId: string;
}

export const useSeatStatus = ({ socket, seatId }: UseSeatStatusProps) => {
  const [status, setStatus] = useState<SeatStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleSeatUpdate = (updatedStatus: unknown) => {
      const status = updatedStatus as SeatStatus; // 타입 단언 추가
      if (status.seatId === seatId) {
        setStatus(status);
      }
    };

    const handleError = (errorData: unknown) => {
      const errorInfo = errorData as { message: string; seatId: string }; // 타입 단언
      if (errorInfo.seatId === seatId) {
        setError(errorInfo.message);
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
