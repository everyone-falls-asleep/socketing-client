import React, { createContext, useState, useEffect } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
  userRole: string | null;
  setUserRole: (userRole: string | null) => void;
  currentRole: string | null;
  setcurrentRole: (currentRole: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  userRole: null,
  setUserRole: () => {},
  currentRole: null,
  setcurrentRole: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(() => {
    // 애플리케이션 로드 시 localStorage에서 userId를 가져와 초기값으로 설정
    return localStorage.getItem("userId");
  });

  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  const [currentRole, setcurrentRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
    if (userRole) {
      setcurrentRole(userRole);
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
      setcurrentRole(null);
    }
  }, [userId, userRole]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userRole,
        setUserRole,
        currentRole,
        setcurrentRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
