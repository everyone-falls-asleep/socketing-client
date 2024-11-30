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
  const { eventId, eventDateId, selectedSeat, reserveSeat, adjacentSeats } =
    useContext(ReservationContext);
  const createReservationMutation = usePostMutation<
    NewReservationResponse,
    AxiosError<ApiErrorResponse>,
    NewReservation
  >(createNewReservation, {
    onSuccess: (response: NewReservationResponse) => {
      if (response.data?.id && selectedSeat?.id && eventId && eventDateId) {
        reserveSeat(selectedSeat?.id, eventId, eventDateId);
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
        <div className="space-y-3">
          <Button
            onClick={() => void handleReservationSubmit()}
            className="p-4 w-full transition-colors "
            variant="primary"
          >
            선택 좌석 예매하기
          </Button>
          {/* 하나만 예매했을 경우 */}
          {adjacentSeats.length === 0 && (
            <div className="border p-3 text-gray-800 bg-white rounded-lg space-y-2">
              {/* 이 버튼 소켓이랑 연결해주세요^0^ */}
              <button className="absolute right-16 md:right-10">✖</button>

              <p className="font-bold text-gray-700">
                <span className="text-black">{selectedSeat.area}</span>구역{" "}
                <span className="text-black">{selectedSeat.row}</span>열{" "}
                <span className="text-black">{selectedSeat.number}</span>번{" "}
              </p>
              <p>
                <span className="font-bold">가격:</span> 99,000원
              </p>
            </div>
          )}

          {/* 인접 좌석이 있을 경우 인접 좌석 정보 표시 */}
          {adjacentSeats.length > 0 && (
            <>
              {adjacentSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="border p-3 text-gray-800 bg-white rounded-lg space-y-2"
                >
                  {/* 이 버튼 소켓이랑 연결해주세요^0^ */}
                  <button className="absolute right-16 md:right-10">✖</button>

                  <p className="font-bold text-gray-700">
                    <span className="text-black">{seat.area}</span>구역{" "}
                    <span className="text-black">{seat.row}</span>열{" "}
                    <span className="text-black">{seat.number}</span>번{" "}
                  </p>

                  <p>
                    <span className="font-bold">가격:</span> 99,000원
                  </p>
                </div>
              ))}
            </>
          )}
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
