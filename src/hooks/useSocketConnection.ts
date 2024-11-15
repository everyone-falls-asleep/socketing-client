import { useEffect, useRef, useState } from "react";
import { createMockSocket } from "../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

export const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<MockSocketType | null>(null);

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
