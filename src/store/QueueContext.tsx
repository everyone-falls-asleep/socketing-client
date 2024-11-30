import React, { createContext, useEffect, useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { useQueueConnection } from "../hooks/useQueueConnection";
import { TokenResponse, UpdatedQueueResponse } from "../types/api/queue";

interface QueueContextType {
  socket: Socket | null;
  isConnected: boolean;
  isTurn: boolean;
  eventId: string | null;
  setEventId: (id: string) => void;
  eventDateId: string | null;
  setEventDateId: (id: string) => void;
  myPosition: number | null;
  totalWaiting: number | null;
}

export const QueueContext = createContext<QueueContextType>(
  {} as QueueContextType
);

export const useQueueContext = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueueContext must be used within a QueueProvider");
  }
  return context;
};

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket, isConnected, isTurn } = useQueueConnection();
  const [eventId, setEventId] = useState<string | null>(null);
  const [eventDateId, setEventDateId] = useState<string | null>(null);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [totalWaiting, setTotalWaiting] = useState<number | null>(null);

  useEffect(() => {
    if (!socket || !eventId || !eventDateId) return;

    socket.emit("joinQueue", { eventId, eventDateId });

    socket.on("tokenIssued", (data: TokenResponse) => {
      localStorage.setItem("entranceToken", data.token);
    });

    socket.on("updateQueue", (data: UpdatedQueueResponse) => {
      setMyPosition(data.yourPosition);
      setTotalWaiting(data.totalWaiting);
    });

    return () => {
      socket.off("connect");
      socket.off("tokenIssued");
      socket.off("updateQueue");
    };
  }, [socket]);

  const value = {
    socket,
    isConnected,
    isTurn,
    eventId,
    setEventId,
    eventDateId,
    setEventDateId,
    myPosition,
    totalWaiting,
  };

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
};
