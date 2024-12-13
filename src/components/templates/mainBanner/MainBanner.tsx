import { CustomEventsProps } from "../../../types/api/event";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentTime } from "../../../hooks/useCurrentTime";
import { getTimeLeft } from "../../../utils/countdownTimer";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";

interface MainBannerProps {
  event: CustomEventsProps | undefined;
}

const MainBanner = ({ event }: MainBannerProps) => {
  const navigate = useNavigate();
  const now = useCurrentTime();

  if (!event) {
    return (
      <>
        <div className="w-full bg-black text-white text-center pb-2 text-3xl">
          <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
            예정된 티켓팅이 없습니다.
          </h1>
        </div>
        <div className="relative w-full h-[24rem] overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-center text-lg text-gray-500">
            티켓팅 예정 이벤트가 없습니다.
          </p>
        </div>
      </>
    );
  }

  const isNotStarted = event.ticketingStartTime > now;
  const timeLeft = getTimeLeft(event.ticketingStartTime, now);

  return (
    <>
      <div className="w-full bg-black text-white text-center pb-2 text-3xl">
        <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
          곧 티켓팅이 시작됩니다!🎉
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
              {event.title}
            </h2>
            <p className="text-lg md:text-2xl font-bold text-white mb-6 text-center">
              티켓 오픈:{" "}
              {event.ticketingStartTime
                ? formatToKoreanDateAndTime(event.ticketingStartTime)
                : "정보 없음"}
            </p>
            <button
              className={`text-sm md:text-base font-bold text-white px-4 py-2 rounded ${
                isNotStarted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={() => {
                const userId = localStorage.getItem("userId");
                if (userId) {
                  navigate(`/event/${event.id}`);
                } else {
                  toast.success(
                    "예약 페이지에 접근하기 위해서는 로그인이 필요합니다."
                  );
                }
              }}
              disabled={isNotStarted}
            >
              {isNotStarted ? `남은 시간: ${timeLeft}` : timeLeft}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
