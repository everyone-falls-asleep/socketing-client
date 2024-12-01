import Button from "../atoms/buttons/Button";
import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPage = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false); // 구매 동의 체크박스 상태
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // 선택된 결제 방법

  const handlePayment = () => {
    if (!isAgreed) {
      toast.error("구매조건 확인 및 결제 진행에 동의해주세요!");
      return;
    }

    if (!paymentMethod) {
      toast.error("결제 방법을 선택해주세요!");
      return;
    }

    toast.success("결제가 진행됩니다!");
    navigate(`/payment`);
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 h-[calc(100vh-132px)] flex justify-center">
        <div className="h-full max-w-4xl py-10 px-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">결제 정보</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 왼쪽 */}
            <div className="md:col-span-2 space-y-6">
              {/* 공연 정보 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">공연 티켓 정보</h2>
                <div className="flex items-center">
                  <img
                    src="https://i.namu.wiki/i/ULEPOWPdbcmUlLgfR3if48VFAcqiwdya-LVBipi6HAYUZDVa0YeVbqpCnCsLoHSdQmpEYwBEAL1yQQxPXgBu_w.webp"
                    alt="공연 포스터"
                    className="w-24 h-28 rounded-md object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      해맑은 다람쥐 공연
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      카이스트 문지캠퍼스
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      2024년 12월 31일 밤 11시 59분
                    </p>
                    <p className="text-gray-600 text-sm">김혜다</p>
                  </div>
                </div>
                <hr className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>2구역 8열 6번</span>
                    <span className="text-gray-800 font-bold">100000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1구역 2열 3번</span>
                    <span className="text-gray-800 font-bold">98000원</span>
                  </div>
                </div>
              </div>

              {/* 주문자 정보 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">주문자 정보</h2>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">김혜다</p>
                    <p className="text-sm text-gray-600">010-5555-7777</p>
                    <p className="text-sm text-gray-600">김혜다@jungle.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className="space-y-6">
              {/* 최종 결제 금액 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">최종 결제금액</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>1구역</span>
                    <span>98,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2구역</span>
                    <span>100,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3구역</span>
                    <span>0원</span>
                  </div>

                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>총 결제금액</span>
                    <span>198,000원</span>
                  </div>
                </div>
              </div>

              {/* 결제 방법 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">결제 방법</h2>
                <div className="text-sm">
                  <input
                    type="radio"
                    id="socketPay"
                    className="mr-2"
                    name="paymentMethod"
                    onChange={() => setPaymentMethod("socketPay")}
                  />
                  <label htmlFor="socketPay">소켓 페이</label>
                </div>
              </div>

              {/* 결제 버튼 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="agree"
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    구매조건 확인 및 결제 진행에 동의
                  </label>
                </div>
                <Button onClick={handlePayment} className="text-sm w-full">
                  결제하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderPage;
