import React, { useState, useRef, useEffect, useContext } from "react";
import { EventCreateContext } from "../../../store/EventCreateContext";
import { usePostMutation } from "../../../hooks/usePostMutation";
import { createNewSeat } from "../../../api/events/eventsApi";
import { NewSeat, NewSeatResponse } from "../../../types/api/event";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { toast } from "react-toastify";

interface Point {
  x: number;
  y: number;
}

export interface Seat {
  seat_id: string;
  x: number;
  y: number;
  area: number;
  row: number;
  number: number;
}

interface SeatMakerProps {
  viewBox?: string;
  onSeatsUpdate?: (seats: Seat[]) => void;
  initialSeats?: Seat[];
}

const SeatMaker: React.FC<SeatMakerProps> = ({
  viewBox = "0 0 10240 7680",
  onSeatsUpdate,
  initialSeats = [],
}) => {
  const { event } = useContext(EventCreateContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  // 현재 좌석 설정값
  const [currentArea, setCurrentArea] = useState(1);
  const [currentRow, setCurrentRow] = useState(1);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [currentPrice, setCurrentPrice] = useState("50000");

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
    if (e.button === 0 && !isEditMode) {
      // 일반 모드에서만 드래깅 가능
      if (
        e.target === e.currentTarget ||
        (e.target as HTMLElement).tagName === "svg"
      ) {
        e.preventDefault();
        setIsDragging(true);
        setStartPoint({
          x: e.clientX,
          y: e.clientY,
        });
      }
    }
  };

  const getSVGCoordinates = (
    e: React.MouseEvent<SVGSVGElement>
  ): { x: number; y: number } => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    // 현재 변환 매트릭스를 고려한 좌표 계산
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    const x = svgP.x;
    const y = svgP.y;

    return { x, y };
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isEditMode) return;

    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).tagName === "svg"
    ) {
      const coordinates = getSVGCoordinates(e);

      const newSeat: Seat = {
        seat_id: `${Date.now()}`,
        x: Math.round(coordinates.x),
        y: Math.round(coordinates.y),
        area: currentArea,
        row: currentRow,
        number: currentNumber,
      };

      console.log("스크린 좌표:", e.clientX, e.clientY);
      console.log("svg 변환 좌표:", newSeat.x, newSeat.y);

      setSeats((prev) => [...prev, newSeat]);
      console.log(seats);
      setCurrentNumber((prev) => prev + 1);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     setBackgroundImage(event.target?.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const createSeatMutation = usePostMutation<
    NewSeatResponse,
    AxiosError<ApiErrorResponse>,
    NewSeat
  >(createNewSeat);

  const handleComplete = async () => {
    setIsEditMode(false);
    onSeatsUpdate?.(seats);

    try {
      if (!event?.id) {
        return;
      }
      const eventID = event?.id;
      await Promise.all(
        seats.map((seat) => {
          const new_seat: NewSeat = {
            event_id: eventID,
            cx: seat.x,
            cy: seat.y,
            area: seat.area,
            row: seat.row,
            number: seat.number,
          };
          return createSeatMutation.mutateAsync(new_seat);
        })
      );
      toast.success("모든 좌석이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.log(error);
      toast.error("좌석 생성 중 오류가 발생했습니다.");
    }
  };

  const handleSeatClick = (seatId: string) => {
    if (!isEditMode) return;

    setSeats((prev) => prev.filter((seat) => seat.seat_id !== seatId));
  };

  const renderSeat = (seat: Seat) => (
    <g
      key={seat.seat_id}
      transform={`translate(${seat.x},${seat.y})`}
      onClick={(e) => {
        e.stopPropagation();
        handleSeatClick(seat.seat_id);
      }}
      style={{ cursor: isEditMode ? "pointer" : "default" }}
    >
      <circle
        r="150"
        fill={isEditMode ? "#FF4444" : "#4A90E2"}
        stroke={isEditMode ? "#CC0000" : "#2171C7"}
        strokeWidth="2"
      />
    </g>
  );

  // if (!event?.svg) {
  //   return <div></div>
  // }

  // const svgStr = event.svg;

  return (
    <div className="flex h-screen">
      {/* Control Panel */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
        <div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`w-full px-4 py-2 rounded ${
              isEditMode
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isEditMode
              ? "편집 모드 (좌석 생성/삭제)"
              : "일반 모드 (화면 이동)"}
          </button>
        </div>

        {isEditMode && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                구역
              </label>
              <input
                type="number"
                value={currentArea}
                onChange={(e) => setCurrentArea(Number(e.target.value))}
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                열
              </label>
              <input
                type="number"
                value={currentRow}
                onChange={(e) => setCurrentRow(Number(e.target.value))}
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                시작 번호
              </label>
              <input
                type="number"
                value={currentNumber}
                onChange={(e) => setCurrentNumber(Number(e.target.value))}
                className="mt-1 w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                가격
              </label>
              <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </div>
          </>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setScale((prev) => Math.min(prev * 1.1, 3))}
            className="flex-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            확대
          </button>
          <button
            onClick={() => setScale((prev) => Math.max(prev / 1.1, 0.5))}
            className="flex-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            축소
          </button>
        </div>

        {isEditMode && (
          <button
            onClick={void handleComplete}
            className="bg-green-500 text-white rounded hover:bg-green-600"
          >
            완료
          </button>
        )}
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-gray-100"
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
          <svg
            width="100%"
            height="100%"
            viewBox={viewBox}
            onClick={handleSvgClick}
            style={{
              backgroundImage: "none",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {seats.map(renderSeat)}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SeatMaker;
