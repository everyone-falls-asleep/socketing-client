import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { usePostMutation } from "../../../hooks/usePostMutation";
import {
  NewReservation,
  NewReservationResponse,
} from "../../../types/api/reservation";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { createNewReservation } from "../../../api/reservations/reservationsApi";

const ReservationSeatInfo = () => {
  const { selectedSeat, eventId, eventDateId } = useContext(ReservationContext);

  const createReservationMutation = usePostMutation<
    NewReservationResponse,
    AxiosError<ApiErrorResponse>,
    NewReservation
  >(createNewReservation);

  const handleReservationSubmit = async () => {
    try {
      if (eventId && eventDateId && selectedSeat) {
        const reservation: NewReservation = {
          eventId,
          eventDateId,
          seatId: selectedSeat.id,
        };
        const response =
          await createReservationMutation.mutateAsync(reservation);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-2/3 p-4">
      {selectedSeat ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">좌석 정보</h2>
          <div className="space-y-2">
            <p>구역: {selectedSeat.area}</p>
            <p>열: {selectedSeat.row}</p>
            <p>번호: {selectedSeat.number}</p>
            <p>가격: 99,000원</p>
          </div>
          <button
            onClick={() => void handleReservationSubmit()}
            className="w-full py-3 bg-blue-500 text-white rounded-lg
                           hover:bg-blue-600 transition-colors"
          >
            예매하기
          </button>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          좌석을 선택해주세요
        </div>
      )}
    </div>
  );
};

export default ReservationSeatInfo;
