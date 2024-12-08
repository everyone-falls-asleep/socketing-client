import React, { useRef, useState, useEffect, useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import SeatObj from "../../atoms/seats/SeatObj";
import SvgWrapper from "../../../utils/SvgWrapper";
import SeatTimer from "../../molecules/timer/SeatTimer";

interface SeatContainerProps {
  svg: string;
}

const SeatContainer: React.FC<SeatContainerProps> = ({ svg }) => {
  const { seatsMap, areasMap } = useContext(ReservationContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const [showLegend, setShowLegend] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );

  const seatsData = Array.from(seatsMap.values());
  const areasData = Array.from(areasMap.values());

  const getTouchDistance = (
    touch1: React.Touch,
    touch2: React.Touch
  ): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPoint({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    e.preventDefault();

    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - startPoint.x;
      const deltaY = e.touches[0].clientY - startPoint.y;

      setTranslate((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setStartPoint({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    } else if (e.touches.length === 2 && lastTouchDistance !== null) {
      const newDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const delta = (newDistance - lastTouchDistance) * 0.01;
      const newScale = Math.min(Math.max(0.5, scale + delta), 3);

      setScale(newScale);
      setLastTouchDistance(newDistance);
    }
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (isDragging && containerRef.current) {
        const deltaX = e.clientX - startPoint.x;
        const deltaY = e.clientY - startPoint.y;

        setTranslate((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        setStartPoint({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = (): void => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(0.5, scale + delta), 3);
      setScale(newScale);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    containerRef.current?.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [isDragging, startPoint, scale]);

  const handleMouseDown = (e: React.MouseEvent): void => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  return (
    <div className="relative h-full">
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-gray-50"
        style={{ height: "100%", touchAction: "none" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          <SvgWrapper
            svgString={svg}
            seats={seatsData}
            areas={areasData}
            renderSeat={(seat) => <SeatObj seatData={seat} />}
          />
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-11 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 gap-2">
        <button
          onClick={() => setScale(Math.min(scale + 0.2, 3))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
          }}
          className="px-2 py-1 border rounded-lg hover:bg-gray-100 text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
      </div>

      <button
        className="absolute top-0 right-0 rounded-md p-2 shadow-lg flex items-center justify-center text-sm border bg-white opacity-70"
        onClick={() => setShowLegend((prev) => !prev)}
      >
        {showLegend ? "▲" : "좌석 색 정보 ▼"}
      </button>

      {showLegend && (
        <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg p-4 flex flex-col text-sm space-y-2 opacity-90">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#FFF]"></div>
            <span className="text-gray-600 font-bold">예매 가능</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#9CA3AF]"></div>
            <span className="text-gray-600 font-bold">예매 완료</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#F66687]"></div>
            <span className="text-gray-600 font-bold">내가 선택</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#FBBF24]"></div>
            <span className="text-gray-600 font-bold">다른 사람이 선택</span>
          </div>
        </div>
      )}
      <SeatTimer />
    </div>
  );
};

export default SeatContainer;
