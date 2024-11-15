export interface SeatStatus {
  seatId: string;
  status: "available" | "reserved" | "temporary_hold";
  lastUpdated: string;
}

export interface ServerToClientEvents {
  "seat:update": (status: SeatStatus) => void;
  "seats:bulk_update": (statuses: SeatStatus[]) => void;
  "seat:error": (error: { message: string; seatId: string }) => void;
}

export interface ClientToServerEvents {
  "seat:watch": (seatId: string) => void;
  "seat:unwatch": (seatId: string) => void;
  "seat:reserve": (seatId: string) => void;
}
