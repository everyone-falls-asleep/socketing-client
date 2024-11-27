import React, { useState } from "react";
import { useEventCreate } from "../../../store/EventCreateContext";
import { createOutlinePath, calculateBoundingBox } from "../../../utils/svg";
import { Contour } from "../../../types/components/common";

const OverallControlPanel: React.FC = () => {
  const {
    editMode,
    setEditMode,
    selectedContours,
    setContours,
    setIsImageVisible,
    contours,
    setSelectedContours,
  } = useEventCreate();
  const [areaNumber, setAreaNumber] = useState<number>(0);

  const createAreaFromSelectedSeats = () => {
    if (!areaNumber || selectedContours.length === 0) return;

    const selectedSeats = contours.filter(
      (contour) =>
        contour.type === "seat" && selectedContours.includes(contour.id)
    );

    if (selectedSeats.length === 0) return;
    const updatedSeats: Contour[] = [];
    const sortedByY = [...selectedSeats].sort(
      (a, b) => (a.cy || 0) - (b.cy || 0)
    );

    const rows: Contour[][] = [];
    let currentRow: Contour[] = [];
    let currentY = sortedByY[0]?.cy;

    sortedByY.forEach((seat) => {
      if (currentY === undefined || Math.abs((seat.cy || 0) - currentY) <= 1) {
        currentRow.push(seat);
      } else {
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [seat];
        currentY = seat.cy || 0;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    rows.forEach((rowSeats, rowIndex) => {
      const sortedSeats = [...rowSeats].sort(
        (a, b) => (a.cx || 0) - (b.cx || 0)
      );

      let currentNumber = 1;
      let previousX = sortedSeats[0]?.cx;

      sortedSeats.forEach((seat) => {
        if (
          previousX !== undefined &&
          Math.abs((seat.cx || 0) - previousX) > 0.5
        ) {
          currentNumber++;
          previousX = seat.cx;
        }

        updatedSeats.push({
          ...seat,
          area: areaNumber,
          row: rowIndex + 1,
          number: currentNumber,
          label: `${rowIndex + 1}-${currentNumber}`,
        });
      });
    });

    const newArea: Contour = {
      id: Math.max(...contours.map((c) => c.id)) + 1,
      type: "area",
      points: selectedSeats.flatMap((seat) => seat.points),
      path: createOutlinePath(selectedSeats, 20, 21),
      center: {
        x:
          selectedSeats.reduce((sum, seat) => sum + (seat.cx || 0), 0) /
          selectedSeats.length,
        y:
          selectedSeats.reduce((sum, seat) => sum + (seat.cy || 0), 0) /
          selectedSeats.length,
      },
      boundingBox: calculateBoundingBox(
        selectedSeats.flatMap((seat) => seat.points)
      ),
      label: areaNumber.toString(),
    };

    // contours 업데이트
    setContours((prevContours: Contour[]): Contour[] => {
      const otherContours = prevContours.filter(
        (contour) => !selectedContours.includes(contour.id)
      );
      return [...otherContours, ...updatedSeats, newArea];
    });

    // 선택 초기화
    setAreaNumber(0);
  };

  const convertAllToSeats = () => {
    setContours((prevContours: Contour[]): Contour[] =>
      prevContours.map((contour) => {
        if (contour.type === "contour") {
          const xs = contour.points.map((p) => p.x);
          const ys = contour.points.map((p) => p.y);
          const cx = Math.round((Math.max(...xs) + Math.min(...xs)) / 2);
          const cy = Math.round((Math.max(...ys) + Math.min(...ys)) / 2);

          const calculateSeatRadius = (contour: Contour): number => {
            const { width, height } = contour.boundingBox;
            return Math.min(width, height) / 2;
          };

          return {
            ...contour,
            type: "seat",
            label: "",
            area: 0,
            cx: cx,
            cy: cy,
            r: calculateSeatRadius(contour),
            row: 0,
            number: 0,
          };
        }
        return contour;
      })
    );
    setIsImageVisible(false);
  };

  return (
    <div className="h-full p-6 space-y-6 overflow-auto">
      <button
        className={`px-4 py-2 rounded ${editMode ? "bg-blue-500" : "bg-gray-300"}`}
        onClick={() => {
          setEditMode(!editMode);
          setSelectedContours([]);
        }}
      >
        드래그 모드
      </button>
      <button
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={convertAllToSeats}
      >
        전체 좌석 생성
      </button>
      {selectedContours.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">구역 이름</label>
            <input
              type="number"
              value={areaNumber}
              onChange={(e) => setAreaNumber(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="구역 이름을 입력하세요"
            />
            <button
              onClick={createAreaFromSelectedSeats}
              disabled={!areaNumber}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              구역 생성
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallControlPanel;
