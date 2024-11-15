import React from "react";
import ReservationUpperEvent from "../organisms/reservation/ResevationUpperEvent";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
import ReservationSeatInfo from "../organisms/reservation/ReservationSeatInfo";
import { useContext } from "react";
import {
  ReservationContext,
  ReservationProvider,
} from "../../store/ReservationContext";
import { mockReservationData } from "../../mocks/reservationData";
import MainLayout from "../layout/MainLayout";

const ReservationPage: React.FC = () => {
  const { socket } = useSocketConnection();
  const { isDateSidebarOpen } = useContext(ReservationContext);

  return (
    <MainLayout>
      <ReservationProvider>
        <div className="h-screen flex flex-col">
          {/* 상단 공연 정보  */}
          <ReservationUpperEvent
            {...mockReservationData.event}
          ></ReservationUpperEvent>
          {/* 하단 섹션 (2/3) */}
          <div className="flex flex-1 relative">
            {/* 날짜 선택 사이드바 (1/5) */}
            <div
              className={`${isDateSidebarOpen ? "ml-1/5" : ""} w-2/5 bg-gray-50 transition-all`}
            >
              <ReservationCalendarSideBar
                dateData={[...mockReservationData.event.date]}
              />
            </div>

            {/* 좌석 선택 영역 (3/5) */}
            <ReservationSeatContainer
              seatsData={mockReservationData.seats}
              socket={socket}
            />

            {/* 우측 사이드바 (1/5) */}
            <div className="w-1/5 border-l bg-white">
              {/* 미니맵 (1/3) */}
              <ReservationMinimap />

              {/* 좌석 정보 및 예매 버튼 (2/3) */}
              <ReservationSeatInfo />
            </div>
          </div>
        </div>
      </ReservationProvider>
    </MainLayout>
  );
};

export default ReservationPage;
