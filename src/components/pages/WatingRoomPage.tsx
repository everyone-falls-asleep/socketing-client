import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";

const stages = ["로비", "대기실", "입장 대기", "매표소 입장"];

const WaitingRoomPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1); // 현재 단계
  const [progress, setProgress] = useState((1 / (stages.length - 1)) * 100); // 진행률 (0% ~ 100%)

  // 단계 진행 시 progress 업데이트
  useEffect(() => {
    setProgress((currentStage / (stages.length - 1)) * 100);
  }, [currentStage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStage < stages.length - 1) {
        setCurrentStage((prev) => prev + 1);
      }
    }, 8000); // 8초마다 다음 단계로 이동
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [currentStage]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white flex flex-col items-center">
        <div
          className="w-full py-4 h-48"
          style={{
            backgroundImage:
              "url('https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/40">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-4 h-40">
              {/* 포스터 이미지 */}
              <div className="mt-4 md:mt-0 md:mr-4">
                <img
                  src="https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif"
                  alt="공연 포스터"
                  className="h-32 object-contain rounded-lg shadow-md"
                />
              </div>
              {/* 텍스트 정보 */}
              <div className="text-white">
                <h1 className="text-2xl font-bold">콜드플레이 월드투어</h1>
                <p className="text-sm mt-3">
                  날짜: 2024년 12월 22일 (금) 18:00
                </p>
                <p className="text-sm mt-1">장소: 서울 올림픽 주경기장</p>
              </div>
            </div>
          </div>
        </div>

        {/* 상단 진행 상태 */}
        <div className="w-full max-w-4xl p-6">
          {/* 단계별 텍스트 */}
          <div className="flex justify-between mt-4 text-sm">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`text-center ${
                  index === currentStage
                    ? "text-rose-400 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {stage}
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-2 bg-gray-700 rounded">
            <div
              className="absolute h-2 bg-rose-400 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 대기실/큐 상태 */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">{stages[currentStage]}</h2>
          <p className="mt-2 text-lg">
            {currentStage === 1 &&
              "대기실에 입장하셨습니다. 잠시 후 입장 대기가 시작됩니다."}
            {currentStage === 2 &&
              "현재 입장 대기 중입니다. 좌석 선택을 위해 준비해주세요!"}
            {currentStage === 3 &&
              "좌석 배치를 보고 원하는 좌석을 선택해주세요!"}
          </p>
          {currentStage === 1 && (
            <p className="mt-4 text-rose-400 text-xl font-bold">12 MIN</p>
          )}
          {currentStage === 2 && (
            <p className="mt-4 text-rose-400 text-xl font-bold">20000번째</p>
          )}
        </div>

        {/* 좌석 배치도 (SeatMap) */}
        <div className="mt-16 px-8">
          <h2 className="text-xl font-bold text-center mb-4">Seat Map</h2>
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            {/* 이미지 삽입 부분 */}
            <img
              src="https://www.mfac.or.kr/web/images/sub/seat_a1_2022.png" // 여기에 실제 좌석 배치도 이미지 경로 삽입
              alt="Seat Map"
              className="object-contain h-full w-full"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WaitingRoomPage;
