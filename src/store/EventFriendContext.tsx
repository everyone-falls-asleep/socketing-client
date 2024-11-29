import React, { createContext, useContext, useState } from "react";
import { User } from "../types/api/user";
import { toast } from "react-toastify";

interface EventFriendContextType {
  eventFriends: User[] | null;
  addFriend: (EventFriend: User) => void;
  deleteFriend: (EventFriendId: string) => void;
}

export const EventFriendContext = createContext<EventFriendContextType>(
  {} as EventFriendContextType
);

export const useEventFriendContext = () => {
  const context = useContext(EventFriendContext);
  if (!context) {
    throw new Error(
      "useEventFriendContext must be used within a EventFriendProvider"
    );
  }
  return context;
};

export const EventFriendProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [eventFriends, seteventFriends] = useState<User[]>([]);

  const addFriend = (newEventFriend: User) => {
    const isDuplicate = eventFriends.some(
      (EventFriend) => EventFriend.id === newEventFriend.id
    );

    if (isDuplicate) {
      toast.error("이미 추가된 친구입니다!");
      return;
    }

    seteventFriends([...eventFriends, newEventFriend]);
  };

  const deleteFriend = (EventFriendIdToDelete: string) => {
    seteventFriends((prev) =>
      prev.filter((EventFriend) => EventFriend.id !== EventFriendIdToDelete)
    );
  };

  const value = {
    eventFriends,
    addFriend,
    deleteFriend,
  };

  return (
    <EventFriendContext.Provider value={value}>
      {children}
    </EventFriendContext.Provider>
  );
};
