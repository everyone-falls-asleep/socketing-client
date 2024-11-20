import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";
import { CustomEventsProps } from "../../../types/api/event";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

interface MainBannerProps {
  event: CustomEventsProps | undefined;
  now: number;
}

const MainBanner = ({ event, now }: MainBannerProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<string>("");

  // 남은 시간 계산
  useEffect(() => {
    if (!event) {
      setTimeLeft("예정된 티켓팅이 없습니다.");
      return;
    }

    const calculateTimeLeft = () => {
      const currentTime = new Date().getTime();
      const difference = event.ticketingStartTime - currentTime;

      if (difference <= 0) {
        setTimeLeft("예매가 시작되었습니다!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${days > 0 ? `${days}일 ` : ""} ${hours}시간 ${minutes}분 ${seconds}초`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return (
      <>
        <div className="w-full bg-black text-white text-center pb-2 text-3xl">
          <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
            예정된 티켓팅이 없습니다.
          </h1>
        </div>
        <div className="relative w-full h-[24rem] overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-center text-gray-500">
            티켓팅 예정 이벤트가 없습니다.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full bg-black text-white text-center pb-2 text-3xl">
        <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
          곧 티켓팅이 시작됩니다!
        </h1>
      </div>
      <div className="relative w-full h-[24rem] overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
              {event.title}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              티켓팅 시작:{" "}
              {event.ticketingStartTime
                ? formatToKoreanDateAndTime(event.ticketingStartTime)
                : "정보 없음"}
            </p>
            <button
              className={`font-bold text-white px-4 py-2 rounded ${
                event.ticketingStartTime > now
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={() =>
                navigate(
                  `/reservation/${event.id}/${
                    event.eventDates?.[0]?.id || "error"
                  }`
                )
              }
              disabled={event.ticketingStartTime > now}
            >
              {timeLeft}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
