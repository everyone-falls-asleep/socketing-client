import React from "react";
import { Link } from "react-router-dom";

type ErrorPageProps = {
  errorMessage?: string; // 선택적 에러 메시지
};

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <p className="text-xl md:text-2xl font-medium mb-6">
        ⚠️ {errorMessage || "페이지를 찾을 수 없습니다."} ⚠️
      </p>
      <Link
        to="../"
        className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default ErrorPage;
