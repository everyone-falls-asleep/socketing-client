import React from "react";

interface ReservationLayoutProps {
  topContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
}

const ReservationLayout: React.FC<ReservationLayoutProps> = ({
  topContent,
  centerContent,
  rightTopContent,
  rightBottomContent,
}) => {
  return (
    <div className="flex flex-col h-screen md:h-full">
      <div className="relative w-full h-36">{topContent}</div>

      <div className="flex md:flex-1 flex-col md:flex-row">
        {/* 센터 콘텐츠 */}
        <div className="md:flex-1 h-[450px] md:h-[calc(100vh-276px)] px-10 md:px-20 py-5">
          {centerContent}
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="w-full md:w-[250px] flex flex-col gap-4 px-10 md:px-5 py-5 bg-gray-50 max-h-64 md:max-h-full overflow-y-auto">
          <div className="hidden md:block border-b pb-2">{rightTopContent}</div>
          <div className="p-1">{rightBottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ReservationLayout;
