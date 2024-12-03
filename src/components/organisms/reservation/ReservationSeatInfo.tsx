import { useContext } from "react";
import { ReservationContext } from "../../../store/ReservationContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import { OrderResponse } from "../../../types/api/socket";

const ReservationSeatInfo = () => {
  const navigate = useNavigate();
  const { selectedSeats, reserveSeat, areasMap, socket } =
    useContext(ReservationContext);

  const handleReservationSocketSubmit = () => {
    const seatIds: string[] = selectedSeats.map((seat) => seat.id);
    if (!socket) return;
    reserveSeat(seatIds); // 소켓 서버 수정 필요
    try {
      socket.on("reservedSeats", (response: OrderResponse) => {
        console.log(response.data);
        navigate("/order", {
          state: { orderData: response.data },
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
          <Button
            onClick={() => void handleReservationSocketSubmit()}
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
                    <span className="text-black">
                      {areasMap?.get(seat.areaId)?.label ?? ""}
                    </span>
                    구역 <span className="text-black">{seat.row}</span>열{" "}
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
