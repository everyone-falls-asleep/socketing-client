import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { QUEUE_SERVER_URL } from "../constants/socket";
import { ServerToClientEvents, ClientToServerEvents } from "../types/api/queue";

export const useQueueConnection = (shouldConnect: boolean) => {
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    if (!shouldConnect) {
      return;
    }
    const token = localStorage.getItem("authToken");
    socketRef.current = io(QUEUE_SERVER_URL, {
      transports: ["websocket"],
      auth: {
        token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Queue Socket connected!");
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Queue Socket disconnected!");
      setIsConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [shouldConnect]);

  return { socket: socketRef.current, isConnected };
};
