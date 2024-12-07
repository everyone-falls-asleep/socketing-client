import { toast } from "react-toastify";
import Button from "../atoms/buttons/Button";
import MainLayout from "../layout/MainLayout";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentDetails } from "../../types/api/payment";
import { updatePayment } from "../../api/reservations/paymentsApi";
import { getUserPoints } from "../../api/users/usersApi";
import { UserContext } from "../../store/UserContext";
import { useQueryClient } from "@tanstack/react-query";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const state = location.state as {
    paymentData: PaymentDetails;
    totalAmount: number;
  };
  const paymentData = state.paymentData;
  const totalAmount = state.totalAmount;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0); // 진행률 상태
  const { userId } = useContext(UserContext);
  const [userPoints, setUserPoints] = useState<number>(-1);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  if (!userId) return;
  const fetchUserPoints = async () => {
    try {
      if (!userId) {
        toast.error("사용자 정보를 가져올 수 없습니다.");
        return;
      }
      const response = await getUserPoints(userId);
      if (response.code === 0 && response.data) {
        setUserPoints(response.data.point ?? 0); // undefined일 경우 0으로 설정
      } else {
        toast.error("금액을 불러오지 못했습니다");
      }
    } catch (error) {
      console.error("금액 조회 중 오류 발생:", error);
      toast.error("금액 조회 중 문제가 발생했습니다.");
    }
  };

  const handleSocketPay = async () => {
    if (!paymentData) {
      toast.error("결제 데이터가 누락되었습니다!");
      return;
    }
    if (userPoints === -1) {
      toast.error("먼저 보유하신 금액를 조회해주세요!");
      return;
    }

    if (userPoints < totalAmount) {
      toast.error("잔액 부족!");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setModalMessage("결제가 진행 중입니다...");

    const duration = 4000; // 진행 바의 총 지속 시간 (ms)
    const interval = 100; // 진행 바 업데이트 주기 (ms)
    const steps = duration / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    try {
      await delay(duration); // 진행 바 완료 후 실행
      const response = await updatePayment({
        orderId: paymentData.order.id,
        paymentId: paymentData.payment.id,
        newPaymentStatus: "completed", // 결제 상태 변경
      });

      await queryClient.invalidateQueries({
        queryKey: [`my-orders-${userId}`],
      }); // orders 쿼리 무효화

      setModalMessage("결제 완료! 🎉");

      setTimeout(() => {
        setIsProcessing(false);
        toast.success("결제가 완료되었습니다!");

        navigate(`/reservation-confirmation`, {
          state: { updatedResponse: response.data },
        });
      }, 1000);
    } catch (error) {
      console.error("결제 상태 업데이트 실패:", error);
      toast.error("결제 상태 업데이트 중 오류가 발생했습니다.");
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 h-full flex justify-center">
        <div className="w-[400px] py-10 px-6">
          <h1 className="text-2xl font-bold mb-6 text-center"> 결제하기</h1>
          <div className="flex flex-col gap-6 ">
            {/* 최종 결제 금액 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg flex justify-between font-bold">
                <span>총 결제금액</span>
                <span>{totalAmount.toLocaleString()} 원</span>
              </h2>
            </div>
            {/* 소켓 페이 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">소켓 페이</h2>
              </div>
              <div>
                <p className="font-bold text-gray-800 mt-4 flex items-baseline justify-between space-x-5">
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => {
                      fetchUserPoints().catch((error) => {
                        console.error("조회 중 오류 발생:", error);
                        toast.error("조회 중 문제가 발생했습니다.");
                      });
                    }}
                  >
                    보유 소켓 조회
                  </Button>{" "}
                  <span>
                    {userPoints === -1
                      ? "조회를 눌러주세요"
                      : `${userPoints.toLocaleString()} 원`}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  handleSocketPay().catch((error) => {
                    console.error("결제 처리 중 오류 발생:", error);
                    toast.error("결제 처리 중 문제가 발생했습니다.");
                  });
                }}
                className="w-[310px]"
              >
                소켓 결제
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* 모달 */}
      {isProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
            <h2 className="text-xl font-bold">{modalMessage}</h2>

            <>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#F66687] h-3 rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                ></div>
              </div>
            </>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PaymentPage;
