import React, { useRef, useState, useEffect } from "react";
import { useManagerContext } from "../../../store/ManagerContext";
import { Seat } from "../../../types/api/managers";
import { ManagerSeatObj } from "../../atoms/seats/ManagerSeatObj";
import { SelectedManagerSeatObj } from "../../atoms/seats/ManagerSeatObj";
import ManagerSvgWrapper from "../../../utils/ManagerSvgWrapper";

const ManagerSeatContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );

  const { seats, selectedSeat, selectedUser } = useManagerContext();

  // 두 터치 포인트 사이의 거리를 계산하는 함수
  const getTouchDistance = (
    touch1: React.Touch,
    touch2: React.Touch
  ): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 1) {
      // 단일 터치 (드래그용)
      setIsDragging(true);
      setStartPoint({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    } else if (e.touches.length === 2) {
      // 두 손가락 터치 (핀치 줌용)
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    e.preventDefault(); // 브라우저의 기본 스크롤을 방지

    if (e.touches.length === 1 && isDragging) {
      // 단일 터치 드래그
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
      // 핀치 줌
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

  // 마우스 이벤트 핸들러
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

  const renderSeat = (seatData: Seat) => {
    const selectedSeat = seats.find(
      (seat) =>
        seatData.reservations?.length > 0 &&
        seat.reservations.some(
          (reservation) => reservation.id === seatData.reservations[0].id
        ) // 검토 필요
    );
    const isSelected = !!selectedSeat;
    const userId = selectedSeat?.reservations[0].order.user.id || "";

    return (
      <>
        {isSelected ? (
          <SelectedManagerSeatObj user_id={userId} seatData={seatData} />
        ) : (
          <ManagerSeatObj />
        )}
      </>
    );
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
          <ManagerSvgWrapper renderSeat={renderSeat} />
        </div>
        {selectedSeat && (
          <div className="absolute right-0 opacity-80 border p-3 text-gray-950 bg-white rounded-lg space-y-2">
            <p className="text-center font-bold text-lg">좌석 예매 정보</p>
            <p>
              <span className="font-bold">ID:</span>{" "}
              {selectedUser?.email.split("@")[0]}
            </p>
            <p className="font-bold text-gray-700">
              {/* 구역 표시를 추가하고 싶으면 주석 해제 */}
              {/* <span className="text-black">1</span>구역{" "} */}
              <span className="text-black">{selectedSeat?.row}</span>열{" "}
              <span className="text-black">{selectedSeat?.number}</span>번{" "}
            </p>
            {/* 주석 처리된 예매 시간 표시 */}
            {/* <p className="flex flex-col">
              <span className="font-bold">예매 시간:</span>
              <div className="pl-6">
                <span> 2024.12.15 11:30</span>
              </div>
            </p> */}
          </div>
        )}
      </div>

      {/* Zoom Controls - 데스크톱에서만 표시 */}
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
    </div>
  );
};

export default ManagerSeatContainer;
