import { Socket } from "socket.io-client";

export interface TokenResponse {
  token: string;
}

export interface UpdatedQueueResponse {
  yourPosition: number;
  totalWaiting: number;
}

export interface SeatsInfoResponseData {
  seat_id: string;
}

export interface SeatsInfoResponse {
  seatsInfo: SeatsInfoResponseData[];
}

export interface ServerToClientEvents {
  tokenIssued: (response: TokenResponse) => void;
  updateQueue: (response: UpdatedQueueResponse) => void;
  seatsInfo: (response: SeatsInfoResponse) => void;
}

interface JoinQueueData {
  eventId: string;
  eventDateId: string;
}

export interface ClientToServerEvents {
  joinQueue: (params: JoinQueueData) => void;
}

export type QueueType = Socket<ServerToClientEvents, ClientToServerEvents>;
