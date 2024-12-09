import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import { OrderResponse } from "../../../types/api/socket";
import { Event } from "../../../types/api/event";

const ReservationSeatInfo = (eventData: Event) => {
  const navigate = useNavigate();
  const {
    selectedSeats,
    reserveSeat,
    areasMap,
    socket,
    currentAreaId,
    eventId,
    eventDateId,
  } = useContext(ReservationContext);

  const handleReservationSocketSubmit = () => {
    const seatIds: string[] = selectedSeats.map((seat) => seat.id);
    if (!socket) return;
    reserveSeat(seatIds); // 소켓 서버 수정 필요
    try {
      socket.on("orderMade", (response: OrderResponse) => {
        console.log(response);
        navigate(`reservation/${eventId}/${eventDateId}/order`, {
          state: { orderData: response.data, eventData },
        });
      });
    } catch {
      toast.error("예매에 실패하셨습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      {selectedSeats ? (
        <div className="space-y-3">
          {selectedSeats.length > 0 && (
            <>
              <Button
                onClick={() => void handleReservationSocketSubmit()}
                className="p-4 w-full transition-colors "
                variant="primary"
              >
                선택 좌석 예매하기
              </Button>
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="border p-3 text-gray-800 bg-white rounded-lg space-y-2"
                >
                  <p className="font-bold text-gray-700">
                    <span className="text-black">
                      {areasMap?.get(currentAreaId!)?.label ?? ""}
                    </span>
                    구역 <span className="text-black">{seat.row}</span>열{" "}
                    <span className="text-black">{seat.number}</span>번{" "}
                  </p>

                  <p>
                    <span className="font-bold">
                      가격: {areasMap?.get(currentAreaId!)?.price ?? ""}원
                    </span>
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
