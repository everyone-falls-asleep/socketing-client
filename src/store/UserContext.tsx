import React, { createContext, useState, useEffect } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [userId, setUserId] = useState<string | null>(null);

  // return (
  //   <UserContext.Provider value={{ userId, setUserId }}>
  //     {children}
  //   </UserContext.Provider>
  // );

  const [userId, setUserId] = useState<string | null>(() => {
    // 애플리케이션 로드 시 localStorage에서 userId를 가져와 초기값으로 설정
    return localStorage.getItem("userId");
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
