import { Socket } from "socket.io-client";

export interface SeatStatus {
  seatId: string;
  status: "available" | "reserved" | "temporary_hold";
  lastUpdated: string;
}

export interface UserList {
  count: number;
  users: [string];
}

export interface ServerToClientEvents {
  "seat:update": (status: SeatStatus) => void;
  "seats:bulk_update": (statuses: SeatStatus[]) => void;
  "seat:error": (error: { message: string; seatId: string }) => void;
  serverTime: (time: string) => void;
  userList: (userList: UserList) => void;
}

export interface ClientToServerEvents {
  "seat:watch": (seatId: string) => void;
  "seat:unwatch": (seatId: string) => void;
  "seat:reserve": (seatId: string) => void;
  "seat:temporary_hold": (seatId: string) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
