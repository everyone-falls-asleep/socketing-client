import React, { useRef, useEffect, useState } from "react";
import { Point } from "../../../types/components/common";
import ContourToSVG from "../../../utils/ContourToSVG";
import { useEventCreate } from "../../../store/EventCreateContext";
import { Contour } from "../../../types/components/common";

interface SeatMakerProps {
  isDateSidebarOpen: boolean;
}

const SeatMaker: React.FC<SeatMakerProps> = ({ isDateSidebarOpen = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const { editMode, setSelectedContours, contours, imageUrl } =
    useEventCreate();
  const [selectionBox, setSelectionBox] = useState<{
    start: Point;
    end: Point;
  } | null>(null);
  const [showAreas, setShowAreas] = useState<boolean>(true);

  const ZOOM_THRESHOLD = 1.1;

  // 화면 좌표를 실제 이미지 좌표로 변환하는 함수
  const screenToSVGCoords = (clientX: number, clientY: number): Point => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    // SVG 요소 가져오기
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return { x: 0, y: 0 };

    // SVG의 현재 ViewBox 가져오기
    // const viewBox = svg.viewBox.baseVal;

    // 화면 좌표를 SVG 좌표로 변환
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;

    // 화면 좌표계에서 SVG 좌표계로 변환
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    return {
      x: svgPoint.x,
      y: svgPoint.y,
    };
  };

  const isContourInSelectionArea = (
    contour: Contour,
    box: { start: Point; end: Point }
  ): boolean => {
    // SVG 좌표계에서의 선택 영역 계산
    const rect = {
      left: Math.min(box.start.x, box.end.x),
      right: Math.max(box.start.x, box.end.x),
      top: Math.min(box.start.y, box.end.y),
      bottom: Math.max(box.start.y, box.end.y),
    };

    // contour의 중심점이 선택 영역 내에 있는지 확인
    return (
      contour.center.x >= rect.left &&
      contour.center.x <= rect.right &&
      contour.center.y >= rect.top &&
      contour.center.y <= rect.bottom
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (editMode && selectionBox) {
        const currentPoint = screenToSVGCoords(e.clientX, e.clientY);
        setSelectionBox((prev) => ({
          start: prev!.start,
          end: currentPoint,
        }));

        const selectedSeats = contours
          .filter(
            (contour) =>
              contour.type === "seat" &&
              isContourInSelectionArea(contour, {
                start: selectionBox.start,
                end: currentPoint,
              })
          )
          .map((c) => c.id);

        setSelectedContours(selectedSeats);
      } else if (isDragging && !editMode) {
        const deltaX = e.clientX - startPoint.x;
        const deltaY = e.clientY - startPoint.y;
        setTranslate((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
        setStartPoint({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setSelectionBox(null);
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(0.5, scale + delta), 3);
      setScale(newScale);
      setShowAreas(newScale <= ZOOM_THRESHOLD);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    containerRef.current?.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [isDragging, startPoint, scale, editMode, selectionBox, contours]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.button === 0) {
      e.preventDefault();

      if (editMode) {
        const startSVGCoords = screenToSVGCoords(e.clientX, e.clientY);
        setSelectionBox({
          start: startSVGCoords,
          end: startSVGCoords,
        });
      } else {
        setIsDragging(true);
        setStartPoint({
          x: e.clientX,
          y: e.clientY,
        });
      }
    }
  };

  // 선택 영역 렌더링 함수
  const renderSelectionBox = () => {
    if (!selectionBox) return null;

    const rect = {
      x: Math.min(selectionBox.start.x, selectionBox.end.x),
      y: Math.min(selectionBox.start.y, selectionBox.end.y),
      width: Math.abs(selectionBox.end.x - selectionBox.start.x),
      height: Math.abs(selectionBox.end.y - selectionBox.start.y),
    };

    return (
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        fill="rgba(0, 0, 255, 0.1)"
        stroke="blue"
        strokeWidth="1"
        className="pointer-events-none"
      />
    );
  };

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
        {imageUrl ? (
          <ContourToSVG
            imageUrl={imageUrl}
            lowThreshold={30}
            highThreshold={150}
            minContourArea={0}
            selectionBox={selectionBox}
            showAreas={showAreas}
          />
        ) : (
          <div className="text-gray-500 text-center">
            이미지를 업로드해주세요.
          </div>
        )}
      </div>
      {renderSelectionBox()}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
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

export default SeatMaker;
