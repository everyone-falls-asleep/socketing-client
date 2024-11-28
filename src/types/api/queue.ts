import { Socket } from "socket.io-client";

export interface TokenResponse {
  token: string;
}

export interface UpdatedQueueResponse {
  yourPosition: number;
  totalWaiting: number;
}
export interface ServerToClientEvents {
  tokenIssued: (response: TokenResponse) => void;
  updateQueue: (response: UpdatedQueueResponse) => void;
}

interface JoinQueueData {
  eventId: string;
  eventDateId: string;
}

export interface ClientToServerEvents {
  joinQueue: (params: JoinQueueData) => void;
}

export type QueueType = Socket<ServerToClientEvents, ClientToServerEvents>;
