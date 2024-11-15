import React from "react";
import { Reservation } from "../../types/api/event";
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

const ReservationPage: React.FC = () => {
  const { socket } = useSocketConnection();

  // 예시 데이터
  const reservationData: Reservation = {
    reservation_id: "1",
    seats: [
      {
        seat_id: "1",
        x: "300",
        y: "400",
        area: "A구역",
        row: "8열",
        number: "20번",
        seat_status: "0",
        event_id: "",
        date: "",
        price: "129000",
      },
      {
        seat_id: "2",
        x: "150",
        y: "200",
        area: "A구역",
        row: "10열",
        number: "7번",
        seat_status: "0",
        event_id: "",
        date: "",
        price: "129000",
      },
    ],
    event: {
      event_id: "1",
      title: "콜드플레이 내한 공연",
      date: ["2024-12-22 18:00PM", "2024-12-23 18:00PM", "2024-12-24 18:00PM"],
      thumbnail:
        "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
      place: "올림픽 주경기장",
      price: "129000",
      cast: "콜드플레이",
      age_limit: "12세",
    },
    created_at: "2024/11/14 12:33 PM",
    exchange_status: "0",
  };
  const { isDateSidebarOpen } = useContext(ReservationContext);

  return (
    <ReservationProvider>
      <div className="h-screen flex flex-col">
        {/* 상단 공연 정보  */}
        <ReservationUpperEvent
          {...reservationData.event}
        ></ReservationUpperEvent>
        {/* 하단 섹션 (2/3) */}
        <div className="flex flex-1 relative">
          {/* 날짜 선택 사이드바 (1/5) */}
          <div
            className={`${isDateSidebarOpen ? "ml-1/5" : ""} w-3/5 bg-gray-50 transition-all`}
          >
            <div className="p-4 h-full">
              <ReservationCalendarSideBar
                dateData={[...reservationData.event.date]}
              />
            </div>
          </div>

          {/* 좌석 선택 영역 (3/5) */}
          <ReservationSeatContainer
            seatsData={[...reservationData.seats]}
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
  );
};

export default ReservationPage;
