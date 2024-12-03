import Button from "../../atoms/buttons/Button";

const ReservationAllInfo = () => {
  return (
    <div className="border p-3 text-gray-800 bg-white rounded-lg space-y-2">
      <p className="text-center font-bold text-lg">공연 예매 정보</p>
      <Button size="sm">예매 현황 업데이트</Button>
      <p>
        <span className="font-bold">총 매출 금액:</span>
        <div className="pl-6">
          <span>20,000,000 원</span>
        </div>
      </p>
      <p>
        <span className="font-bold">총 예매된 좌석수:</span>
        <div className="pl-6">
          <span> 150 / 200 (75%)</span>
        </div>
      </p>
      <p className="flex flex-col">
        <span className="font-bold">공연 상태:</span>
        <div className="pl-6">
          <span>예매 진행 중</span>
        </div>
        <div className="pl-6">
          <span>예매 종료</span>
        </div>
      </p>
    </div>
  );
};

export default ReservationAllInfo;
