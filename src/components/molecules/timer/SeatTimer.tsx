import { useEffect, useContext, useState } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { toast } from "react-toastify";

const SeatTimer = () => {
  const { socket, isConnected, selectedSeats, setSelectedSeats } =
    useContext(ReservationContext);
  const [serverTime, setServerTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleServerTime = (time: string) => {
      const newServerTime = new Date(time).getTime();
      setServerTime(newServerTime);
    };

    socket.on("serverTime", handleServerTime);

    return () => {
      console.log("seat timer server timer listen off");
      socket.off("serverTime", handleServerTime);
    };
  }, [socket, isConnected]);

  useEffect(() => {
    setShowTimer(selectedSeats.length > 0);
  }, [selectedSeats]);

  useEffect(() => {
    if (!selectedSeats[0]?.expirationTime) return;

    const calculateTimeLeft = () => {
      const expireTime = new Date(selectedSeats[0].expirationTime).getTime();
      return Math.max(0, Math.round((expireTime - serverTime) / 1000));
    };

    const newTimeLeft = calculateTimeLeft();
    setTimeLeft(newTimeLeft);

    if (newTimeLeft <= 0 && showTimer) {
      setShowTimer(false);
      setSelectedSeats([]);
      toast.error("선택이 취소되었습니다!");
    }
  }, [serverTime, selectedSeats, setSelectedSeats, showTimer]);

  const percentage = Math.max(0, (timeLeft / 10) * 100);

  return (
    <>
      {showTimer && timeLeft > 0 && (
        <div
          className="absolute top-4 left-4 opacity-90 size-11 md:size-20 rounded-full flex items-center justify-center text-white text-xl font-bold"
          style={{
            background: `conic-gradient(#F66687 ${percentage}%, #ddd ${percentage}%)`,
          }}
        >
          {timeLeft}
        </div>
      )}
    </>
  );
};

export default SeatTimer;
