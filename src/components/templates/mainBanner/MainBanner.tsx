import { useState, useEffect } from "react";
import { EventListProps } from "../../organisms/event-lists/EventList";
import { useNavigate } from "react-router-dom";

const MainBanner = ({ events }: EventListProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/event`);
  };
  const [current, setCurrent] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 3000); // 3초마다 슬라이드
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 해제
  }, [events]);

  return (
    <div className="relative w-full h-[32rem] overflow-hidden">
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            onClick={onClickHandler}
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
            <h2 className="text-xl font-bold">{event.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainBanner;
