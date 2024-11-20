import React, { useState, useRef, useEffect, useContext } from "react";
import { Seat } from "../../../types/api/socket";
import SeatObj from "../../atoms/seats/SeatObj";
import SvgWrapper from "../../../utils/SvgWrapper";
import { ReservationContext } from "../../../store/ReservationContext";

interface Point {
  x: number;
  y: number;
}

interface SeatContainerProps {
  seatsData: Seat[];
  svg: string;
  viewBox?: string;
}

const SeatContainer: React.FC<SeatContainerProps> = ({
  seatsData,
  svg,
  viewBox = "0 0 10240 7680",
}) => {
  const { socket, isConnected } = useContext(ReservationContext);

  // Zoom & Pan State
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Server Info State
  const [serverTime, setServerTime] = useState<string>("");
  const [connectedUserNum, setConnectedUserNum] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Server Time Updates
    socket.on("serverTime", (timestamp: string) => {
      const formattedTime = new Date(timestamp).toLocaleString();
      setServerTime(formattedTime);
    });

    // Connected Users Count
    socket.on("userList", (data: { count: number }) => {
      setConnectedUserNum(data.count);
    });

    // Seat Updates
    socket.on("seatUpdate", () => {
      setLastUpdate(new Date().toLocaleString());
    });

    return () => {
      socket.off("serverTime");
      socket.off("userList");
      socket.off("seatUpdate");
    };
  }, [socket, isConnected]);

  // Pan Handler
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

  // Mouse Event Handlers
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

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

  // Reset View
  const resetView = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const renderSeat = (seatData: Seat) => (
    <g key={seatData.id} transform={`translate(${seatData.cx},${seatData.cy})`}>
      <SeatObj seatData={{ ...seatData, cx: 0, cy: 0 }} />
    </g>
  );

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden bg-gray-100"
      style={{ height: "100%" }}
      onMouseDown={handleMouseDown}
    >
      {/* Main Seat Container */}
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

      {/* Server Status Overlay */}
      <div className="absolute top-4 right-4 bg-white/90 rounded-lg shadow-lg p-3 text-sm">
        <div className="mb-2">
          <span className="font-semibold">Server Status: </span>
          <span
            className={`inline-block w-3 h-3 rounded-full ml-2 ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
        <div className="mb-1">
          <span className="font-semibold">Users Online: </span>
          {connectedUserNum}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Server Time: </span>
          {serverTime || "Connecting..."}
        </div>
        {lastUpdate && (
          <div className="text-xs text-gray-500">Last update: {lastUpdate}</div>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.2, 3))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          +
        </button>
        <button
          onClick={resetView}
          className="px-2 py-1 border rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SeatContainer;
