import React, { useState, useEffect } from "react";
import { useEventCreate } from "../../../store/EventCreateContext";
import { Contour } from "../../../types/components/common";

const SeatControlPanel: React.FC = () => {
  const {
    contours,
    selectedContour,
    setSelectedContour,
    updateContourType,
    updateContourLabel,
    setContours,
  } = useEventCreate();

  const [areaLabel, setAreaLabel] = useState<string>("");
  const [areaPrice, setAreaPrice] = useState<number>(0);

  const selectedContourData =
    selectedContour !== null
      ? contours.find((c) => c.id === selectedContour)
      : null;

  useEffect(() => {
    if (selectedContourData?.type === "area") {
      setAreaLabel(selectedContourData.label || "");
      setAreaPrice(selectedContourData.price || 0);
    }
  }, [selectedContourData]);

  const typeToKorean = {
    contour: "미지정",
    seat: "좌석",
    polygon: "부대시설",
    area: "구역",
  };

  const updateAreaInfo = () => {
    if (!selectedContourData || selectedContourData.type !== "area") return;

    setContours((prevContours) =>
      prevContours.map((contour) => {
        if (contour.id === selectedContourData.id) {
          return {
            ...contour,
            label: areaLabel,
            price: areaPrice,
          };
        } else if (
          contour.type === "seat" &&
          contour.area_id === selectedContourData.id
        ) {
          return {
            ...contour,
            price: areaPrice,
          };
        }
        return contour;
      })
    );
  };

  if (!selectedContourData) {
    return (
      <div className="h-full p-6">
        <p className="text-gray-500 text-center">선택된 요소가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="h-full p-2 space-y-3 overflow-auto bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          현재 타입: {typeToKorean[selectedContourData.type]}
        </h3>
      </div>

      {selectedContourData.type === "contour" && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div className="space-y-3">
            <button
              onClick={() =>
                updateContourType(selectedContourData.id, "polygon")
              }
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              부대시설로 지정
            </button>
          </div>
        </div>
      )}

      {selectedContourData.type === "area" && (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              구역 이름 수정
            </label>
            <input
              type="text"
              value={areaLabel}
              onChange={(e) => setAreaLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="구역 이름을 입력하세요"
            />
            <label className="block text-sm font-medium text-gray-700">
              구역 좌석 가격 수정
            </label>
            <input
              type="number"
              value={areaPrice}
              onChange={(e) => setAreaPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="구역 가격을 입력하세요"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={updateAreaInfo}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={!areaLabel || areaPrice <= 0}
              >
                구역 정보 수정
              </button>
              <button
                onClick={() => {
                  setContours(
                    (prevContours) =>
                      prevContours
                        .map((contour) => {
                          if (contour.id === selectedContourData.id) {
                            return null;
                          } else if (
                            contour.type === "seat" &&
                            contour.area_id === selectedContourData.id
                          ) {
                            return {
                              ...contour,
                              area_id: undefined,
                              price: undefined,
                              row: undefined,
                              number: undefined,
                              label: "",
                            };
                          }
                          return contour;
                        })
                        .filter(Boolean) as Contour[]
                  );
                  setSelectedContour(null);
                }}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                type="button"
              >
                구역 삭제
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              * 구역 정보를 수정하면 해당 구역의 모든 좌석 가격이
              업데이트됩니다.
            </p>
            <p className="text-sm text-red-600 mt-1">
              * 구역을 삭제하면 해당 구역의 모든 좌석이 미지정 상태가 됩니다.
            </p>
          </div>
        </div>
      )}

      {selectedContourData.type === "seat" && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div className="space-y-4">
            {selectedContourData.area_id ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    구역 정보 - {selectedContourData.area_id}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가격 - {selectedContourData.price}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    열 번호 - {selectedContourData.row}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    좌석 번호 - {selectedContourData.number}
                  </label>
                </div>
              </>
            ) : (
              <div className="text-red-500 text-center py-4">
                구역 설정이 안된 좌석입니다, 구역 설정 먼저해주세요
              </div>
            )}
          </div>
        </div>
      )}

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
