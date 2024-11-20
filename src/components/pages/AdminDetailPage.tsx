import FourSectionLayout from "../layout/FourSectionLayout";
import AdminReservationSeatContainer from "../organisms/admin/AdminReservationSeatContainer";
import ReservationUpperEvent from "../organisms/reservation/ReservationUpperEvent";
import { fetchReservationsByEvent } from "../../api/reservations/reservationsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { ReservationsResponse } from "../../types/api/reservation";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { fetchAllSeats, fetchOneEvent } from "../../api/events/eventsApi";
import { SeatResponse, SingleEventResponse } from "../../types/api/event";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import { UserSeat, Seat } from "../../types/api/event";

const AdminDetailPage = () => {
  const { id } = useParams();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);

  const useReservations = createResourceQuery<ReservationsResponse>(
    "all-reservations-by-event",
    fetchReservationsByEvent
  );

  const useEvent = createResourceQuery<SingleEventResponse>(
    "single-event",
    fetchOneEvent
  );

  const useSeat = createResourceQuery<SeatResponse>("seats", fetchAllSeats);

  const {
    data: reservationData,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useReservations(id);

  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
  } = useEvent(id);

  const {
    data: seatsData,
    isLoading: seatsLoading,
    isError: seatsError,
  } = useSeat(id);

  if (reservationLoading || eventLoading || seatsLoading)
    return <p>{fetchErrorMessages.isLoading}</p>;
  if (reservationError || eventError || seatsError)
    return <p>{fetchErrorMessages.general}</p>;
  if (!reservationData?.data) {
    return <>{fetchErrorMessages.noReservationData}</>;
  }
  if (!eventData?.data) {
    return <>{fetchErrorMessages.noEventData}</>;
  }
  if (!seatsData?.data) {
    return <>{fetchErrorMessages.noSeatsData}</>;
  }

  const seatsByEventDate = reservationData.data.reduce(
    (acc, entry) => {
      const eventId = entry.eventDate.id;
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(entry.seat);
      return acc;
    },
    {} as { [key: string]: Seat[] }
  );

  console.log(seatsByEventDate);

  const userSeats: UserSeat[] = reservationData.data.reduce((acc, entry) => {
    const userId = entry.user.id;
    const seat = entry.seat;

    // Find existing UserSeat entry for the user
    let userEntry = acc.find((item) => item.user_id === userId);

    if (!userEntry) {
      // If no entry exists, create a new one
      userEntry = { user_id: userId, seats: [] };
      acc.push(userEntry);
    }

    // Add the seat to the user's seats
    userEntry.seats.push(seat);

    return acc;
  }, [] as UserSeat[]);

  console.log("user_seats: ", userSeats);

  return (
    <FourSectionLayout
      topContent={<ReservationUpperEvent {...eventData?.data} />}
      leftSidebarContent={
        <ReservationCalendarSideBar dateData={eventData.data.eventDates} />
      }
      centerContent={
        <AdminReservationSeatContainer
          seatsData={seatsData.data}
          selectedSeatsData={userSeats} // 일단 첫번째 eventDate의 좌석으로만 처리
          svg={eventData.data.svg ?? ""}
        />
      }
      rightTopContent={<></>}
      rightBottomContent={<></>}
      isLeftSidebarOpen={isLeftSidebarOpen}
      toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
    />
  );
};

export default AdminDetailPage;
