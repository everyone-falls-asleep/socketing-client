import { useState, useEffect } from "react";
import { EventListProps } from "../../organisms/event-lists/EventList";
import { useNavigate } from "react-router-dom";

// 중간 발표를 위해 오전 11시까지 남은시간을 타이머로 만듦
const MainBanner = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // // 자동 슬라이드 기능
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % events.length);
  //   }, 3000); // 3초마다 슬라이드
  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 해제
  // }, [events]);

  // const now = new Date().getTime(); // 현재 시간

  const now = new Date().getTime();
  const filteredEvents = events
    .map((event) => ({
      ...event,
      closestDate: event.eventDates
        .map((date) => new Date(date.date).getTime())
        .sort((a, b) => a - b)[0], // 가장 가까운 날짜 찾기
    }))
    .filter((event) => event.closestDate > now) // 현재 시간 이후 이벤트만 필터링
    .sort((a, b) => a.closestDate - b.closestDate) // 가장 가까운 날짜 순으로 정렬
    .slice(0, 1); // 상위 5개만 가져오기

  // 오전 11시까지 남은 시간 계산
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(11, 0, 0, 0); // 오전 11시로 설정

      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1); // 다음 날 오전 11시로 변경
      }

      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("예매가 시작되었습니다!");
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`남은 시간 : ${hours}시간 ${minutes}분 ${seconds}초`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer); // 메모리 누수 방지
  }, []);

  // 슬라이드 변경 핸들러
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % filteredEvents.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? filteredEvents.length - 1 : prev - 1));
  };

  return (
    <>
      {/* 남은 시간 표시 */}
      <div className="w-full text-black text-center py-2 text-3xl"></div>
      <div className="w-full bg-black text-white text-center py-2 text-3xl">
        <h1 className="text-[24px] font-bold">곧 티켓팅이 시작됩니다!</h1>
      </div>
      <div className="relative w-full h-[32rem] overflow-hidden bg-gray-100 flex items-center justify-center">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            티켓팅 예정 이벤트가 없습니다.
          </p>
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {/* 제목과 버튼 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                  {event.title}
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                  티켓팅 시작: 11월 21일(목) 11:00 AM
                </p>
                <button
                  className="bg-rose-500 hover:bg-rose-600 font-bold text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/reservation/${event.id}`)}
                >
                  {timeLeft}
                </button>
              </div>
            </div>
          ))
        )}

        {/* 왼쪽/오른쪽 버튼: 이벤트가 있을 때만 표시 */}
        {filteredEvents.length > 0 && (
          <>
            <button
              className="absolute top-0 left-0 h-full w-[5%] bg-black bg-opacity-30 text-white flex items-center justify-center"
              onClick={handlePrev}
            >
              &larr;
            </button>
            <button
              className="absolute top-0 right-0 h-full w-[5%] bg-black bg-opacity-30 text-white flex items-center justify-center"
              onClick={handleNext}
            >
              &rarr;
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MainBanner;
