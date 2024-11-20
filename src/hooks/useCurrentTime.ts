import { useState, useEffect } from "react";

export const useCurrentTime = () => {
  const [now, setNow] = useState(() => new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return now;
};
