import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* 스피너 */}
        <div className="w-12 h-12 border-4 border-t-rose-400 border-gray-300 rounded-full animate-spin mx-auto"></div>
        {/* 텍스트 */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          페이지가 곧 준비됩니다!
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
