import React from "react";
import Header from "../templates/header/Header";

interface FourSectionLayoutProps {
  topContent: React.ReactNode;
  leftSidebarContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
  isLeftSidebarOpen?: boolean;
  toggleSidebar: () => void;
}

const FourSectionLayout: React.FC<FourSectionLayoutProps> = ({
  topContent,
  leftSidebarContent,
  centerContent,
  rightTopContent,
  rightBottomContent,
  isLeftSidebarOpen = true,
  toggleSidebar,
}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[80px]">
        <Header />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-1/4 w-full bg-white border-b">{topContent}</div>
        <div className="flex flex-1 min-h-0">
          <div
            className={`transition-transform duration-300 w-1/5 bg-white border-r relative
              ${isLeftSidebarOpen ? "block" : "hidden"}`}
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

          <div className="w-1/5 flex flex-col bg-white border-l">
            <div className="border-b p-4 space-y-3">{rightTopContent}</div>
            <div className="flex-1 p-4 max-h-[100px]">{rightBottomContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourSectionLayout;
