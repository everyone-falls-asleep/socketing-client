import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/socket";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/api/socket";

export const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("entranceToken");
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      auth: {
        token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected!");
      setIsConnected(true);
      setTokenError(null);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err.message);

      if (err.message === "Authentication error 2") {
        setTokenError(err.message);
      }
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected!");
      setIsConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected, tokenError };
};
