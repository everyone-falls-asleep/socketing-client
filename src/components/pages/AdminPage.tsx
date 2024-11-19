// import { useState } from "react";
// import FourSectionLayout from "../layout/FourSectionLayout";
// import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
// import ReservationMinimap from "../organisms/reservation/ReservationMinimap";
// import ReservationSeatContainer from "../organisms/reservation/ReservationSeatContainer";
// import ReservationSeatInfo from "../organisms/reservation/ReservationSeatInfo";
// import ReservationUpperEvent from "../organisms/reservation/ReservationUpperEvent";
import { fetchReservationsByEvent } from "../../api/reservations/reservationsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { ReservationsResponse } from "../../types/api/reservation";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { fetchAllSeats } from "../../api/events/eventsApi";
import { SeatResponse } from "../../types/api/event";

const AdminPage = () => {
  const temp_event_id = "bcf40e9d-dc28-45f7-983e-7d98b69b422f";
  // const [isLeftSidebarOpen, setIsLeftSidebarOpen] =
  //   useState(true);

  const useReservations = createResourceQuery<ReservationsResponse>(
    "all-reservations-by-event",
    fetchReservationsByEvent
  );
  const useSeat = createResourceQuery<SeatResponse>("seats", fetchAllSeats);

  const { data, isLoading, isError } = useReservations(temp_event_id);
  const {
    data: seats_data,
    isLoading: seatsLoading,
    isError: seatsError,
  } = useSeat(temp_event_id);

  if (isLoading || seatsLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError || seatsError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) {
    return <>{fetchErrorMessages.noReservationData}</>;
  }
  if (!data.data[0].eventDate.event) {
    return <p>{fetchErrorMessages.noReservationData}</p>;
  }
  const eventData = data.data[0].eventDate.event;
  console.log(eventData);
  if (!seats_data?.data) {
    return <>{fetchErrorMessages.noSeatsData}</>;
  }
  // const seatsData = seats_data?.data;

  // const dateData = data.data[0].eventDate;

  return (
    <div></div>
    // <FourSectionLayout
    //   topContent={<ReservationUpperEvent {...eventData} />}
    //   leftSidebarContent={
    //     <ReservationCalendarSideBar dateData={[dateData]} />
    //   }
    //   centerContent={
    //     <ReservationSeatContainer
    //       seatsData={seatsData}
    //       svg={eventData.svg ?? ""}
    //     />
    //   }
    //   rightTopContent={<ReservationMinimap />}
    //   rightBottomContent={<ReservationSeatInfo />}
    //   isLeftSidebarOpen={isLeftSidebarOpen}
    //   toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
    // />
  );
};

export default AdminPage;
