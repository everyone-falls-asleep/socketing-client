import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { usePostMutation } from "../../../hooks/usePostMutation";
// import {
//   NewReservation,
//   NewReservationResponse,
// } from "../../../types/api/reservation";
import { NewOrder, NewOrderResponse } from "../../../types/api/order";
import { createNewOrder } from "../../../api/orders/ordersApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
// import { createNewReservation } from "../../../api/reservations/reservationsApi";
import { postReservationErrorMessages } from "../../../constants/errorMessages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";

const ReservationSeatInfo = () => {
  const navigate = useNavigate();
  const { eventId, eventDateId, selectedSeats, reserveSeat } =
    useContext(ReservationContext);
  const createReservationMutation = usePostMutation<
    NewOrderResponse,
    AxiosError<ApiErrorResponse>,
    NewOrder
  >(createNewOrder, {
    onSuccess: (response: NewOrderResponse) => {
      if (response.data?.id && selectedSeats[0].id && eventId && eventDateId) {
        reserveSeat(selectedSeats[0].id, eventId, eventDateId); // 소켓 서버 수정 필요
        console.log(response.data);
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
      if (eventId && eventDateId && selectedSeats[0]) {
        const order: NewOrder = {
          eventId: eventId,
          eventDateId: eventDateId,
          seatIds: selectedSeats.map((seat) => seat.id),
        };
        await createReservationMutation.mutateAsync(order);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {selectedSeats ? (
        <div className="space-y-3">
          <Button
            onClick={() => void handleReservationSubmit()}
            className="p-4 w-full transition-colors "
            variant="primary"
          >
            선택 좌석 예매하기
          </Button>

          {selectedSeats.length > 0 && (
            <>
              {selectedSeats.map((seat) => (
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
