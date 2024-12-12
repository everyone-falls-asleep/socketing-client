import React from "react";
import Header from "../templates/header/Header";

interface FourSectionLayoutProps {
  topContent: React.ReactNode;
  leftSidebarContent?: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
  isLeftSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const FourSectionLayout: React.FC<FourSectionLayoutProps> = ({
  topContent,
  leftSidebarContent,
  centerContent,
  rightTopContent,
  rightBottomContent,
  isLeftSidebarOpen = false,
  toggleSidebar,
}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[80px]">
        <Header />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-1/4 w-full bg-white border-b">{topContent}</div>
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          <div
            className={`transition-transform duration-300 md:w-1/5 bg-white border-r relative ${
              isLeftSidebarOpen ? "block" : "hidden"
            }`}
          >
            {leftSidebarContent}
          </div>

          <div className="flex-1 relative">
            <button
              onClick={toggleSidebar}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 
                rounded-r-lg shadow-md hover:bg-gray-50 transition-colors border border-l-0"
            >
              {isLeftSidebarOpen ? "◀" : "▶"}
            </button>
            {centerContent}
          </div>

          <div className="hidden md:flex md:w-1/4 flex-col max-h-full overflow-y-auto bg-white border-l">
            <div className="border-b max-h-[220px]">{rightTopContent}</div>
            <div className="flex-1 p-4  overflow-y-auto">
              {rightBottomContent}
            </div>
          </div>
        </div>
        {/* 아래는 모바일 반응형 */}
        <div className="md:hidden bg-white border-t max-h-64 overflow-y-auto">
          <div className="p-4 border-b">{rightTopContent}</div>
          <div className="p-4">{rightBottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default FourSectionLayout;
