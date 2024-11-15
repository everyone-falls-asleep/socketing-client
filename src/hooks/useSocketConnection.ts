import { useEffect, useRef, useState } from "react";
import { createMockSocket } from "../mocks/mockSocket";
import { Socket } from "socket.io-client";

export const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = createMockSocket();

    socketRef.current.on("connect", () => {
      console.log("Socket connected!");
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected!");
      setIsConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
};
