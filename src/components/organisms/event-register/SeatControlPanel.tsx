import React from "react";
import { useEventCreate } from "../../../store/EventCreateContext";

const SeatControlPanel: React.FC = () => {
  const { contours, selectedContour, updateContourType, updateContourLabel } =
    useEventCreate();

  const selectedContourData =
    selectedContour !== null
      ? contours.find((c) => c.id === selectedContour)
      : null;

  // type에 따른 한글 표시 매핑
  const typeToKorean = {
    contour: "미지정",
    seat: "좌석",
    polygon: "부대시설",
    area: "구역",
  };

  if (!selectedContourData) {
    return (
      <div className="h-full p-6">
        <p className="text-gray-500 text-center">선택된 요소가 없습니다.</p>
      </div>
    );
  }

  const handleRowChange = (value: string) => {
    const newRow = parseInt(value) || 0;
    updateContourLabel(
      selectedContourData.id,
      `${newRow}-${selectedContourData.number || 0}`
    );
  };

  const handleNumberChange = (value: string) => {
    const newNumber = parseInt(value) || 0;
    updateContourLabel(
      selectedContourData.id,
      `${selectedContourData.row || 0}-${newNumber}`
    );
  };

  return (
    <div className="h-full p-6 space-y-6 overflow-auto bg-gray-50">
      {/* 공통 헤더 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          현재 타입: {typeToKorean[selectedContourData.type]}
        </h3>
      </div>

      {/* Contour type일 때의 타입 선택 패널 */}
      {selectedContourData.type === "contour" && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h4 className="text-md font-medium text-gray-700">타입 선택</h4>
          <div className="space-y-3">
            <button
              onClick={() => updateContourType(selectedContourData.id, "seat")}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              좌석
            </button>
            <button
              onClick={() =>
                updateContourType(selectedContourData.id, "polygon")
              }
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              부대시설
            </button>
          </div>
        </div>
      )}

      {/* Seat type일 때의 정보 패널 */}
      {selectedContourData.type === "seat" && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                구역
              </label>
              <input
                type="text"
                value={selectedContourData.area || ""}
                onChange={(e) =>
                  updateContourLabel(selectedContourData.id, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="구역 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                열 번호
              </label>
              <input
                type="number"
                value={selectedContourData.row || ""}
                onChange={(e) => handleRowChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="열 번호 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                좌석 번호
              </label>
              <input
                type="number"
                value={selectedContourData.number || ""}
                onChange={(e) => handleNumberChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="좌석 번호 입력"
              />
            </div>
          </div>
        </div>
      )}

      {/* Polygon type일 때의 정보 패널 */}
      {selectedContourData.type === "polygon" && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시설 이름
            </label>
            <input
              type="text"
              value={selectedContourData.label || ""}
              onChange={(e) =>
                updateContourLabel(selectedContourData.id, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="시설 이름 입력"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatControlPanel;
