import React, { useState, useRef, useEffect } from "react";
import { Seat } from "../../../types/api/event";
import SeatObj from "../../atoms/seats/SeatObj";
import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { createMockSocket } from "../../../mocks/mockSocket";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface Point {
  x: number;
  y: number;
}

interface SeatContainerProps {
  seatsData: Seat[];
  socket: MockSocketType | null;
}

const SeatContainer: React.FC<SeatContainerProps> = ({ seatsData, socket }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const { isDateSidebarOpen } = useContext(ReservationContext);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(0.5, scale + delta), 2);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      // 마우스 중간 버튼
      e.preventDefault();
      setIsDragging(true);
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-gray-100 cursor-move transition-all duration-300
                 ${isDateSidebarOpen ? "ml-1/5" : ""}`}
      onMouseDown={handleMouseDown}
      style={{ touchAction: "none" }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 0.1s ease-out",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 800 800">
          {seatsData.map((seatData) => (
            <SeatObj
              key={seatData.seat_id}
              seatData={seatData}
              socket={socket}
            />
          ))}
        </svg>
      </div>

      {/* 확대/축소 컨트롤 */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
          className="px-3 py-1 border rounded-lg mr-2 hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SeatContainer;
