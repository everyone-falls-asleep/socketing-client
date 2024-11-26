import { createContext, useContext, useState } from "react";
import { EventFriend } from "./mockEventFriendType";

// Context 타입
interface MockEventFriendContextType {
  eventFriends: EventFriend[];
  addEventFriend: (friend: EventFriend) => void;
  updateEventFriendStatus: (
    id: number,
    status: "requested" | "accepted"
  ) => void;
  deleteEventFriend: (id: number) => void;
}

const MockEventFriendContext = createContext<
  MockEventFriendContextType | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
}

export const MockEventFriendProvider = ({ children }: Props) => {
  const [eventFriends, setEventFriends] = useState<EventFriend[]>([]);

  // 친구 추가 함수
  const addEventFriend = (friend: EventFriend) => {
    setEventFriends((prev) => {
      const updated = [...prev, friend];
      console.log(updated);
      return updated;
    });
  };

  // 친구 상태 업데이트 함수
  const updateEventFriendStatus = (
    id: number,
    status: "requested" | "accepted"
  ) => {
    setEventFriends((prev) =>
      prev.map((friend) =>
        friend.id === id
          ? {
              ...friend,
              status,
              updatedAt: new Date().toISOString(),
              responseTime: new Date().toISOString(),
            }
          : friend
      )
    );
  };

  // 친구 삭제 함수
  const deleteEventFriend = (id: number) => {
    setEventFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <MockEventFriendContext.Provider
      value={{
        eventFriends,
        addEventFriend,
        updateEventFriendStatus,
        deleteEventFriend,
      }}
    >
      {children}
    </MockEventFriendContext.Provider>
  );
};

// Custom Hook
export const useMockEventFriendContext = () => {
  const context = useContext(MockEventFriendContext);
  if (!context) {
    throw new Error(
      "useMockEventFriendContext must be used within an MockEventFriendProvider"
    );
  }
  return context;
};
