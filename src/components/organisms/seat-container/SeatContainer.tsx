import React, { useRef, useState, useEffect, useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import SeatObj from "../../atoms/seats/SeatObj";
import SvgWrapper from "../../../utils/SvgWrapper";

interface SeatContainerProps {
  svg: string;
  viewBox?: string;
}

const SeatContainer: React.FC<SeatContainerProps> = ({
  svg,
  viewBox = "0 0 10240 7680",
}) => {
  const { socket, isConnected, seatsMap } = useContext(ReservationContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [serverInfo, setServerInfo] = useState({
    time: "",
    userCount: 0,
    lastUpdate: "",
  });

  const seatsData = Array.from(seatsMap.values());

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("serverTime", (timestamp: string) => {
      setServerInfo((prev) => ({
        ...prev,
        time: new Date(timestamp).toLocaleString(),
      }));
    });

    socket.on("userList", (data: { count: number }) => {
      setServerInfo((prev) => ({
        ...prev,
        userCount: data.count,
      }));
    });

    socket.on("seatUpdate", () => {
      setServerInfo((prev) => ({
        ...prev,
        lastUpdate: new Date().toLocaleString(),
      }));
    });

    return () => {
      socket.off("serverTime");
      socket.off("userList");
      socket.off("seatUpdate");
    };
  }, [socket, isConnected]);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const deltaX = e.clientX - startPoint.x;
      const deltaY = e.clientY - startPoint.y;
      setTranslate((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setStartPoint({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => setIsDragging(false));
    containerRef.current?.addEventListener("wheel", (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      setScale((prev) => Math.min(Math.max(0.5, prev + delta), 3));
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", () => setIsDragging(false));
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      setStartPoint({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="relative h-full">
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-gray-100"
        style={{ height: "100%" }}
        onMouseDown={handleMouseDown}
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
            renderSeat={(seat) => (
              <g key={seat.id} transform={`translate(${seat.cx},${seat.cy})`}>
                <SeatObj seatData={seat} />
              </g>
            )}
            viewBox={viewBox}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 text-sm flex justify-between items-center h-10 border-t">
        <div>Server Time: {serverInfo.time}</div>
        <div>Connected Users: {serverInfo.userCount}</div>
        <div>Last Update: {serverInfo.lastUpdate}</div>
      </div>
    </div>
  );
};

export default SeatContainer;
