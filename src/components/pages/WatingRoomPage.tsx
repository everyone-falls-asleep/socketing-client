import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const WaitingRoomPage: React.FC = () => {
  const [queuePosition, setQueuePosition] = useState(486); // 대기 순번
  const totalQueue = 622; // 전체 대기 인원
  const navigate = useNavigate();

  useEffect(() => {
    // 대기 순번이 줄어드는 로직
    const interval = setInterval(() => {
      setQueuePosition((prev) =>
        prev > 1 ? prev - Math.floor(Math.random() * 50 + 1) : 1
      ); // 1까지 감소
    }, 2000); // 2초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  // queuePosition이 0 이하가 되면 다른 페이지로 이동
  useEffect(() => {
    if (queuePosition <= 0) {
      navigate("/reservation/presentation"); // 이동할 경로
    }
  }, [queuePosition, navigate]);
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
        {/* 상단 안내 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            접속 인원이 많아 대기 중입니다.
          </h1>
          <p className="text-rose-400 font-bold mt-2">조금만 기다려주세요.</p>
          <p className="mt-4 text-lg font-bold">
            👨‍👦중간 발표 공연: 채동현 팀👩‍👧‍👧
          </p>
        </div>

        {/* 대기 순번 표시 */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl text-black font-bold mb-4">나의 대기순서</h2>
          <p className="text-4xl font-extrabold text-rose-400">
            {queuePosition.toLocaleString()}
          </p>
          <div className="relative w-full h-4 bg-gray-200 rounded-full mt-6">
            <div
              className="absolute h-4 bg-rose-400 rounded-full"
              style={{
                width: `${Math.max(0, ((totalQueue - queuePosition) / totalQueue) * 100)}%`,
              }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            현재 대기인원:{" "}
            <span className="font-bold">{totalQueue.toLocaleString()}명</span>
          </p>
        </div>
        {/* 안내 문구 */}
        <div className="mt-6 text-sm text-center text-gray-500">
          <p>잠시만 기다리시면, 예매하기 페이지로 연결됩니다.</p>
          <p>
            새로고침 하시면 대기순서가 초기화 되어 대기시간이 더 길어집니다.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default WaitingRoomPage;
