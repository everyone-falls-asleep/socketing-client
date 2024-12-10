import { useEffect, useContext, useState } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentTimer = () => {
  const { socket, isConnected, currentOrder, setCurrentOrder, eventId } =
    useContext(ReservationContext);
  const [serverTime, setServerTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleServerTime = (time: string) => {
      const newServerTime = new Date(time).getTime();
      setServerTime(newServerTime);
    };

    socket.on("serverTime", handleServerTime);

    return () => {
      socket.off("serverTime", handleServerTime);
    };
  }, [socket, isConnected]);

  useEffect(() => {
    setShowTimer(currentOrder !== null);
  }, [currentOrder]);

  useEffect(() => {
    if (!currentOrder) return;

    const calculateTimeLeft = () => {
      const expireTime = new Date(currentOrder.expirationTime).getTime();
      return Math.max(0, Math.round((expireTime - serverTime) / 1000));
    };

    const newTimeLeft = calculateTimeLeft();
    setTimeLeft(newTimeLeft);

    if (newTimeLeft <= 0 && showTimer) {
      setShowTimer(false);
      setCurrentOrder(null);
      toast.error("결제 시간이 초과되었습니다!");
      navigate(`/event/${eventId}`);
    }
  }, [serverTime, currentOrder, setCurrentOrder, showTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  return (
    <>
      {showTimer && timeLeft > 0 && (
        <div className="opacity-90 p-3 md:p-5 h-10 rounded-md flex items-center justify-center bg-[#fe3665] text-white md:text-xl font-bold">
          <span className="pr-3">남은 시간</span> {formatTime(timeLeft)}
        </div>
      )}
    </>
  );
};

export default PaymentTimer;
