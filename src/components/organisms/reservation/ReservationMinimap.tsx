const ReservationMinimap = () => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-3 pl-2">좌석 상태</h2>
      <div className="bg-gray-100 rounded-lg h-[calc(100%-2rem)]">
        <div className="p-3 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#FFF]"></div>
            <span className="text-gray-600">예매 가능한 좌석</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#9CA3AF]"></div>
            <span className="text-gray-600">예매 완료된 좌석</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#60A5FA]"></div>
            <span className="text-gray-600">내가 선택한 좌석</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#FBBF24]"></div>
            <span className="text-gray-600">다른 사람이 선택한 좌석</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMinimap;
