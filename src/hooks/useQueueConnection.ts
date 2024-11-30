import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { QUEUE_SERVER_URL } from "../constants/socket";
import { ServerToClientEvents, ClientToServerEvents } from "../types/api/queue";

export const useQueueConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTurn, setIsTurn] = useState(false);
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
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
      setIsTurn(true);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected, isTurn };
};
