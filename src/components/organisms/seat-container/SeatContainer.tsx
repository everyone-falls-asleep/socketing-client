import React, { useState, useRef, useEffect, useContext } from "react";
import { Seat } from "../../../types/api/event";
import SeatObj from "../../atoms/seats/SeatObj";
import { ReservationContext } from "../../../store/ReservationContext";
import { createMockSocket } from "../../../mocks/mockSocket";
import SvgWrapper from "../../../utils/SvgWrapper";

type MockSocketType = ReturnType<typeof createMockSocket>;

interface Point {
  x: number;
  y: number;
}

interface SeatContainerProps {
  seatsData: Seat[];
  socket: MockSocketType | null;
  svg: string;
  viewBox?: string;
}

const SeatContainer: React.FC<SeatContainerProps> = ({
  seatsData,
  socket,
  svg,
  viewBox = "0 0 10240 7680",
}) => {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const renderSeat = (seatData: Seat) => (
    <g key={seatData.id} transform={`translate(${seatData.cx},${seatData.cy})`}>
      <SeatObj seatData={{ ...seatData, cx: 0, cy: 0 }} socket={socket} />
    </g>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-gray-100 transition-all duration-300
                 ${isDateSidebarOpen ? "ml-1/5" : ""}`}
      onMouseDown={handleMouseDown}
      style={{ touchAction: "none" }}
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
          renderSeat={renderSeat}
          viewBox={viewBox}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.2, 3))}
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
          onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SeatContainer;
