import React, { useRef, useEffect } from "react";
import { useEventCreate } from "../../../store/EventCreateContext";
import SvgWrapperApi from "../../../utils/SvgWrapperApi";
import { Seat } from "../../../types/api/event";
import { Point } from "../../../types/api/event";

interface SeatMakerProps {
  isEditMode: boolean;
  scale: number;
  setScale: (value: number) => void;
  currentArea: number;
  currentRow: number;
  currentNumber: number;
  setCurrentNumber: (value: number) => void;
  seats: Seat[];
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  isDateSidebarOpen?: boolean;
  snapToGrid: boolean;
  setSnapToGrid: (value: boolean) => void;
}

const SeatMaker: React.FC<SeatMakerProps> = ({
  isEditMode,
  scale,
  setScale,
  currentArea,
  currentRow,
  currentNumber,
  setCurrentNumber,
  seats,
  setSeats,
  isDateSidebarOpen = false,
  snapToGrid,
}) => {
  const { event } = useEventCreate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startPoint, setStartPoint] = React.useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = React.useState<Point>({ x: 0, y: 0 });

  const gridSize = 20;

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.button === 0 && !isEditMode) {
      e.preventDefault();
      setIsDragging(true);
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const getSVGCoordinates = (e: React.MouseEvent<SVGSVGElement>): Point => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const snapToGridPoint = (point: Point): Point => {
    if (!snapToGrid) return point;
    return {
      x: Math.round(point.x / gridSize) * gridSize,
      y: Math.round(point.y / gridSize) * gridSize,
    };
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>): void => {
    if (!isEditMode) return;

    const targetElement = e.target as HTMLElement;
    if (targetElement.tagName === "circle") {
      return;
    }

    const coordinates = getSVGCoordinates(e);
    const snappedCoordinates = snapToGridPoint(coordinates);

    const newSeat: Seat = {
      id: `temp-${Date.now()}`,
      cx: Math.round(snappedCoordinates.x),
      cy: Math.round(snappedCoordinates.y),
      area: currentArea,
      row: currentRow,
      number: currentNumber,
    };

    setSeats((prev) => [...prev, newSeat]);
    setCurrentNumber(currentNumber + 1);
  };

  const handleSeatClick = (seatId: string): void => {
    if (!isEditMode) return;
    setSeats((prev) => {
      return prev.filter((seat) => {
        const result = seat.id !== seatId;
        return result;
      });
    });
  };

  const renderSeat = (seat: Seat): JSX.Element => (
    <g
      key={seat.id}
      transform={`translate(${seat.cx},${seat.cy})`}
      onClick={(e) => {
        e.stopPropagation();
        handleSeatClick(seat.id);
        setCurrentNumber(currentNumber - 1);
      }}
      style={{ cursor: isEditMode ? "pointer" : "default" }}
    >
      <circle
        r="20"
        fill={isEditMode ? "#FF4444" : "#4A90E2"}
        stroke={isEditMode ? "#CC0000" : "#2171C7"}
        strokeWidth="2"
      />
    </g>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#fcf8f8] transition-all duration-300 
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
        <SvgWrapperApi
          svgString={event?.svg || ""}
          onClick={handleSvgClick}
          seats={seats}
          renderSeat={renderSeat}
          scale={scale}
          isDateSidebarOpen={isDateSidebarOpen}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => {
            const newScale = Math.min(scale + 0.2, 3);
            setScale(newScale);
          }}
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
          onClick={() => {
            const newScale = Math.max(scale - 0.2, 0.5);
            setScale(newScale);
          }}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SeatMaker;
