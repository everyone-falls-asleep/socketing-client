const ReservationMinimap = () => {
  return (
    <div>
      <h2 className="text-lg font-bold p-4">전체 좌석도</h2>
      <div className="bg-gray-100 rounded-lg h-[calc(100%-2rem)]">
        <div className="p-3 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-black bg-[#FFF]"></div>
            <span>예매 가능한 좌석</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-black bg-[#9CA3AF]"></div>
            <span>예약 완료된 좌석</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-black bg-[#FBBF24]"></div>
            <span>다른 사람이 점유 중인 좌석</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMinimap;
