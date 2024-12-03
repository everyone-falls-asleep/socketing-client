import { toast } from "react-toastify";
import Button from "../atoms/buttons/Button";
import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const totalAmount = 198000;
  const navigate = useNavigate();

  const [socketPay, setSocketPay] = useState<number>(2000000);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0); // 진행률 상태

  const handleSocketPay = () => {
    if (socketPay < totalAmount) {
      toast.error("잔액 부족!");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setModalMessage("현재 보유 소켓 " + socketPay.toLocaleString() + " 원");

    const duration = 6000; // 진행 바의 총 지속 시간 (ms)
    const interval = 100; // 진행 바 업데이트 주기 (ms)
    const steps = duration / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / steps) * 100);

      if (currentStep === Math.floor(steps / 3)) {
        setModalMessage("결제 금액: -" + totalAmount.toLocaleString() + " 원");
      }

      if (currentStep === Math.floor((steps * 2) / 3)) {
        setSocketPay((prev) => prev - totalAmount);
        setModalMessage(
          "남은 소켓: " + (socketPay - totalAmount).toLocaleString() + " 원"
        );
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setModalMessage("결제 완료! 🎉");

        setTimeout(() => {
          setIsProcessing(false);
          navigate("/"); //일단은 홈페이지로 보내자!
        }, 1000);
      }
    }, interval);
  };
  return (
    <MainLayout>
      <div className="bg-gray-100 h-[calc(100vh-132px)] flex justify-center">
        <div className="h-full w-[400px] py-10 px-6">
          <h1 className="text-2xl font-bold mb-6 text-center"> 결제하기</h1>
          <div className="flex flex-col gap-6 ">
            {/* 최종 결제 금액 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg flex justify-between font-bold">
                <span>총 결제금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </h2>
            </div>
            {/* 소켓 페이 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">소켓 페이</h2>
              </div>
              <div>
                <p className="font-bold text-gray-800 mt-4 flex items-baseline justify-between space-x-5">
                  <Button size="sm" variant="dark">
                    보유 소켓 조회
                  </Button>{" "}
                  <span>{socketPay.toLocaleString()} 원</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSocketPay} className="w-[310px]">
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
              <p className="text-gray-500 mt-2">결제가 진행 중입니다...</p>
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
