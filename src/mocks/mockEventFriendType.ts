import { Event } from "../types/api/event";
import { User } from "../types/api/user";

export interface EventFriend {
  id: number;
  event: Event;
  user: User;
  friendUser: User;
  status: "requested" | "accepted";
  requestTime: string;
  responseTime: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
