import { useManagerContext } from "../../../store/ManagerContext";

const SeatUserInfo = () => {
  const { selectedSeat, selectedUser } = useManagerContext();

  return (
    <>
      {selectedSeat && (
        <div className="border p-3 text-gray-950 bg-white rounded-lg space-y-2">
          <p className="text-center font-bold text-xl text-black">
            예매 유저 정보
          </p>
          <p className="text-lg text-center font-bold">
            ID :{" "}
            <span className=" text-blue-800">
              {selectedUser?.email.split("@")[0]}
            </span>
          </p>
          <p className="font-bold text-gray-700 text-lg text-center">
            {/* 구역 표시를 추가하고 싶으면 주석 해제 */}
            <span className="text-blue-800">
              {selectedSeat?.label}
            </span>구역{" "}
            <span className="text-blue-800">{selectedSeat?.row}</span>열{" "}
            <span className="text-blue-800">{selectedSeat?.number}</span>번{" "}
          </p>
          {/* 주석 처리된 예매 시간 표시 */}
          {/* <p className="flex flex-col">
                <span className="font-bold">예매 시간:</span>
                <div className="pl-6">
                <span> 2024.12.15 11:30</span>
                </div>
                </p> */}
        </div>
      )}
    </>
  );
};

export default SeatUserInfo;
