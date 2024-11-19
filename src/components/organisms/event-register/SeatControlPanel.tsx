import React from "react";
import { useEventCreate } from "../../../store/EventCreateContext";
import { Seat } from "../../../types/api/event";
import { toast } from "react-toastify";
import { createNewSeat } from "../../../api/events/eventsApi";
import { usePostMutation } from "../../../hooks/usePostMutation";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { NewSeat, NewSeatResponse } from "../../../types/api/event";
import { postSeatErrorMessages } from "../../../constants/errorMessages";

interface SeatControlPanelProps {
  seats: Seat[];
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  currentArea: number;
  setCurrentArea: (value: number) => void;
  currentRow: number;
  setCurrentRow: (value: number) => void;
  currentNumber: number;
  setCurrentNumber: (value: number) => void;
  currentPrice: string;
  setCurrentPrice: (value: string) => void;
  onComplete: (updatedSeats: Seat[]) => void;
  snapToGrid: boolean;
  setSnapToGrid: (value: boolean) => void;
}

const SeatControlPanel: React.FC<SeatControlPanelProps> = ({
  seats,
  isEditMode,
  setIsEditMode,
  currentArea,
  setCurrentArea,
  currentRow,
  setCurrentRow,
  currentNumber,
  setCurrentNumber,
  currentPrice,
  setCurrentPrice,
  snapToGrid,
  setSnapToGrid,
}) => {
  const { event } = useEventCreate();

  const createSeatMutation = usePostMutation<
    NewSeatResponse,
    AxiosError<ApiErrorResponse>,
    NewSeat
  >(createNewSeat);

  const handleComplete = async () => {
    setIsEditMode(false);

    try {
      if (!event?.id) return;

      const results = await Promise.allSettled(
        seats.map((seat) => {
          const new_seat: NewSeat = {
            event_id: event.id,
            cx: seat.cx || seat.x!,
            cy: seat.cy || seat.y!,
            area: seat.area,
            row: seat.row,
            number: seat.number,
          };
          return createSeatMutation.mutateAsync(new_seat, {
            onError: () => {},
          });
        })
      );

      const firstError = results.find(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected"
      );

      if (firstError) {
        const error = firstError.reason as AxiosError<ApiErrorResponse>;
        if (error.response) {
          const code = error.response.data.code;

          switch (code) {
            case 8:
              toast.error(postSeatErrorMessages.invalidToken);
              break;
            case 5:
              toast.error(postSeatErrorMessages.validation);
              break;
            case 9:
              toast.error(postSeatErrorMessages.inValidevent);
              break;
            case 10:
              toast.error(postSeatErrorMessages.duplicatesSeat);
              break;
            default:
              toast.error(postSeatErrorMessages.general);
          }
        } else {
          toast.error(postSeatErrorMessages.general);
        }
        return; // 처리 중단
      }

      toast.success("모든 좌석이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.log(error);
      toast.error(postSeatErrorMessages.general);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`w-full px-4 py-2 rounded ${
            isEditMode
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isEditMode ? "좌석 수정 마치기" : "클릭으로 좌석 생성하기"}
        </button>
        {!isEditMode && (
          <button
            onClick={() => void handleComplete()}
            className="bg-green-500 text-white rounded hover:bg-green-600"
          >
            현재 상태로 좌석 등록하기
          </button>
        )}
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
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              격자 설정
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                id="snapToGrid"
                className="rounded border-gray-300"
              />
              <label htmlFor="snapToGrid" className="text-sm text-gray-600">
                격자 스냅
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatControlPanel;
