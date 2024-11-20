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
import { postReservationErrorMessages } from "../../../constants/errorMessages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";

const ReservationSeatInfo = () => {
  const navigate = useNavigate();
  const { eventId, eventDateId, selectedSeat } = useContext(ReservationContext);
  const createReservationMutation = usePostMutation<
    NewReservationResponse,
    AxiosError<ApiErrorResponse>,
    NewReservation
  >(createNewReservation, {
    onSuccess: (response: NewReservationResponse) => {
      if (response.data?.id) {
        navigate(`/reservation-confirmation/${response.data.id}`);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        switch (code) {
          case 8:
            toast.error(postReservationErrorMessages.invalidToken);
            break;
          case 13:
            toast.error(postReservationErrorMessages.reserved);
            break;
          default:
            toast.error(postReservationErrorMessages.general);
        }
      } else {
        toast.error(postReservationErrorMessages.general);
      }
    },
  });
  const handleReservationSubmit = async () => {
    try {
      if (eventId && eventDateId && selectedSeat) {
        const reservation: NewReservation = {
          eventId,
          eventDateId,
          seatId: selectedSeat.id,
        };
        await createReservationMutation.mutateAsync(reservation);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {selectedSeat ? (
        <div className="space-y-4 p-1">
          <h2 className="text-lg font-bold pl-1 text-gray-800">좌석 정보</h2>
          <div className="border p-3 text-gray-800 rounded-lg space-y-2">
            <p>구역: {selectedSeat.area}</p>
            <p>열: {selectedSeat.row}</p>
            <p>번호: {selectedSeat.number}</p>
            <p>가격: 99,000원</p>
          </div>
          <div className="text-center">
            <Button
              onClick={() => void handleReservationSubmit()}
              className="p-4 w-full transition-colors"
            >
              예매하기
            </Button>
          </div>
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
