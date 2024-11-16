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
import { useQuery } from "@tanstack/react-query";
import { fetchOneEvent } from "../../api/events/eventsApi";
import { SingleEventResponse } from "../../types/api/event";
import { useParams } from "react-router-dom";

const ReservationPage: React.FC = () => {
  const { socket } = useSocketConnection();
  const { isDateSidebarOpen } = useContext(ReservationContext);
  const { id } = useParams();
  const useEvent = (event_id: string) => {
    return useQuery<SingleEventResponse, Error>({
      queryKey: ["single-event", event_id],
      queryFn: ({ queryKey }) => {
        const [, event_id] = queryKey as [string, string];
        return fetchOneEvent(event_id);
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const { data, isLoading, isError, error } = useEvent(id ?? "default-id");

  if (isLoading) {
    console.log(data);
    return <p>이벤트를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>오류 발생: {error.message}</p>;
  }

  if (!data?.data) {
    return <p>오류 발생: 공연 정보를 불러올 수 없습니다.</p>;
  }

  const eventData = data.data;

  return (
    <MainLayout>
      <ReservationProvider>
        <div className="h-screen flex flex-col">
          {/* 상단 공연 정보  */}
          <ReservationUpperEvent {...eventData}></ReservationUpperEvent>
          {/* 하단 섹션 (2/3) */}
          <div className="flex flex-1 relative">
            {/* 날짜 선택 사이드바 (1/5) */}
            <div
              className={`${isDateSidebarOpen ? "ml-1/5" : ""} w-2/5 bg-gray-50 transition-all`}
            >
              <ReservationCalendarSideBar dateData={data.data.eventDates} />
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
