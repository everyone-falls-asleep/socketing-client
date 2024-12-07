// import Button from "../../atoms/buttons/Button";
import PropTypes from "prop-types";

interface ReservationAllInfoProps {
  totalReservations: number;
  totalAmount: number;
  totalSeats: number;
}

const ReservationAllInfo: React.FC<ReservationAllInfoProps> = ({
  totalReservations = 0,
  totalAmount = 0,
  totalSeats = 0,
}) => {
  const formatNumber = (num: number) => {
    return num?.toLocaleString() || "0";
  };

  return (
    <div className="border flex flex-col justify-center items-center p-6 text-gray-800 bg-white rounded-lg space-y-4">
      <p className="font-bold text-2xl text-center">공연 예매 정보</p>
      {/* <Button size="sm">예매 현황 업데이트</Button> */}
      <p className="text-xl text-center">
        <span className="font-bold">총 매출 금액:</span>
        <div className="pt-2">
          <span>{formatNumber(totalAmount)}원</span>
        </div>
      </p>
      <p className="text-xl text-center">
        <span className="font-bold">총 예매된 좌석수:</span>
        <div className="pt-2">
          <span>
            {totalReservations} / {totalSeats} (
            {((totalReservations / totalSeats) * 100).toFixed(1)}%)
          </span>
        </div>
      </p>
      {/* <p className="flex flex-col">
        <span className="font-bold">공연 상태:</span>
        <div className="pl-6">
          <span>예매 진행 중</span>
        </div>
        <div className="pl-6">
          <span>예매 종료</span>
        </div>
      </p> */}
    </div>
  );
};

ReservationAllInfo.propTypes = {
  totalReservations: PropTypes.number as PropTypes.Validator<number>,
  totalAmount: PropTypes.number as PropTypes.Validator<number>,
  totalSeats: PropTypes.number as PropTypes.Validator<number>,
};

export default ReservationAllInfo;
