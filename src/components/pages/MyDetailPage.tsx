import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { GetOneOrderResponse } from "../../types/api/order";
import Font from "../atoms/fonts/Font";
import {
  fetchErrorMessages,
  cancelOrderErrorMessages,
} from "../../constants/errorMessages";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import Button from "../atoms/buttons/Button";
import { useContext, useState } from "react";
import { cancelOrder, getOneOrder } from "../../api/orders/ordersApi";
import { toast } from "react-toastify";
import { UserContext } from "../../store/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import MySeatContainer from "../organisms/seat-container/MySeatContainer";
import { fetchAllSeats } from "../../api/events/eventsApi";
import { OrderSeat } from "../../types/api/order";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const MyDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [seatsData, setSeatsData] = useState<OrderSeat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[] | undefined>(
    []
  );

  const useOneOrder = createResourceQuery<GetOneOrderResponse>(
    `my-order-${userId}`, // 쿼리 키의 기본 이름
    (orderId) => getOneOrder(orderId) // fetchFn으로 getAllOrder 사용
  );
  const { data, isLoading, isError } = useOneOrder(orderId);

  const order = data?.data;
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!order)
    return <ErrorPage errorMessage={fetchErrorMessages.noReservationData} />;

  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(orderId!);
      if (response.code === 0) {
        toast.success(cancelOrderErrorMessages.success);
      } else {
        switch (response.code) {
          case 8:
            toast.error(cancelOrderErrorMessages.unauthorized);
            break;
          case 15:
            toast.error(cancelOrderErrorMessages.notFound);
            break;
          case 22:
            toast.error(cancelOrderErrorMessages.alreadyCanceled);
            break;
          case 6:
            toast.error(cancelOrderErrorMessages.internalServerError);
            break;
          default:
            toast.error("알 수 없는 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("취소 처리 중 오류가 발생했습니다.");
    }
  };
  // 모달 열기
  const openCancelModal = () => setIsCancelModalOpen(true);
  const openShowModal = async () => {
    setSelectedSeatIds(
      order?.reservations.map((reservation) => reservation.seatId)
    );
    const seatData = await fetchAllSeats(order.eventId);
    setSeatsData(seatData.data ?? []);
    setIsShowModalOpen(true);
  };

  // 모달 닫기
  const closeCancelModal = () => setIsCancelModalOpen(false);
  const closeShowModal = () => setIsShowModalOpen(false);

  // 예매 취소 확인
  const handleCancelReservation = async () => {
    closeCancelModal(); // 모달 닫기
    await handleCancelOrder();
    await queryClient.invalidateQueries({
      queryKey: [`my-orders-${userId}`],
    }); // orders 쿼리 무효화
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <>
      <MainLayout>
        <div className="p-5 md:p-10 overflow-y-auto max-h-[calc(100%-64px)]">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            {/* Header Section with Event Image */}
            <div className="h-36 md:h-[180px]">
              <div className="w-full h-full flex space-x-5 bg-rose-100 p-3  md:p-4 rounded-t-lg">
                <img
                  src={order.eventThumbnail}
                  alt={order.eventTitle}
                  className="hidden md:block max-w-32 h-full object-cover rounded"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-gray-800 text-xl md:text-3xl font-bold mb-2">
                    {order.eventTitle}
                  </p>
                  <Font className="text-gray-700 font-bold mb-1 md:my-2 text-lg md:text-xl">
                    {order.eventCast}
                  </Font>
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="font-bold">
                    {order.userEmail.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <Font className="font-bold text-gray-800">
                    {order.userEmail.slice(0, 3)}
                  </Font>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400">📅</div>
                  <div>
                    <Font className="font-bold text-gray-700 mb-1">일시</Font>
                    <Font className="text-gray-600">
                      {formatToKoreanDateAndTime(order.eventDate)}
                    </Font>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400">📍</div>
                  <div>
                    <Font className="font-bold text-gray-700 mb-1">장소</Font>
                    <Font className="text-gray-600">{order.eventPlace}</Font>
                  </div>
                </div>

                <div className="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-6 text-gray-400 inline-block ">🎫</div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-gray-700 mb-2">좌석</div>
                      <Button
                        onClick={() => void openShowModal()}
                        variant="dark"
                        size="sm"
                      >
                        좌석 위치 확인
                      </Button>
                    </div>
                    <div className="text-gray-600">
                      {order.reservations.map((reservation, index) => (
                        <div key={reservation.seatId || index} className="mb-1">
                          {reservation.seatAreaLabel}구역 {reservation.seatRow}
                          열 {reservation.seatNumber}번
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Font className="text-sm text-gray-500 text-center block">
                  공연 당일 예매내역을 확인할 수 있는 신분증을 지참해주세요.
                </Font>
              </div>
            </div>
          </div>

          {/* 예매 취소 버튼 */}
          <div className="fixed bottom-0 right-8 md:left-0 md:right-0 pb-4  flex justify-center">
            <Button
              onClick={openCancelModal}
              className={`${order.orderCanceledAt !== null ? "hidden" : ""}`}
            >
              예매 취소
            </Button>
          </div>
        </div>
        {/* 모달 */}
        {isCancelModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg mx-8 md:mx-auto p-6 w-96">
              <h2 className="text-xl font-bold mb-4">예매 취소</h2>
              <p className="text-gray-600 mb-6">
                정말 예매를 취소하시겠습니까?
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  size="sm"
                  onClick={() => {
                    handleCancelReservation().catch((error) => {
                      console.error("취소 처리 중 오류 발생:", error);
                      toast.error("취소 처리 중 문제가 발생했습니다.");
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  예매 취소
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={closeCancelModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  뒤로 가기
                </Button>
              </div>
            </div>
          </div>
        )}
        {isShowModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 md:w-[60vw] md:h-[60vh] relative flex flex-col">
              <h2 className="text-2xl font-bold mb-4">내 좌석 위치</h2>
              <div className="md:max-h-[43vh]">
                <MySeatContainer
                  svg={order.eventSvg}
                  seats={seatsData}
                  selectedSeatIds={selectedSeatIds}
                  reservedByMe={true}
                />
              </div>
              <div className="flex justify-end mt-auto">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={closeShowModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default MyDetailPage;
