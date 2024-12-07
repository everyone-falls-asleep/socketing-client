// import { fetchReservationsByEvent } from "../../api/reservations/reservationsApi";
// import { fetchErrorMessages } from "../../constants/errorMessages";
import { useParams } from "react-router-dom";
import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationLayout from "../layout/ReservationLayout";
import ReservationAllInfo from "../organisms/reservation/ReservationAllInfo";
import MainLayout from "../layout/MainLayout";
import { EventManagement } from "../../types/api/managers";
import { fetchOneEventForManager } from "../../api/managers/managersApi";
import { useEffect, useState } from "react";
import AdminReservationUpperEvent from "../organisms/reservation/AdminReservationUpperEvent";

const AdminDetailPage = () => {
  const { eventId, eventDateId } = useParams();

  const [eventData, setEventData] = useState<EventManagement | null>(null);

  // if (!eventId || !eventDateId) {
  //   return <p>{fetchErrorMessages.general}</p>
  // }
  const getEventManagement = async () => {
    try {
      const response = await fetchOneEventForManager(
        eventId ?? "",
        eventDateId ?? ""
      );
      if (!response.data) {
        return;
      }
      setEventData(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    void getEventManagement();
  }, [eventId, eventDateId]);

  if (!eventData) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }
  console.log(eventData);
  const allSeats = eventData.areas.flatMap((area) => area.seats);

  let totalReservations = 0;
  let totalAmount = 0;

  // Iterate through each event date
  eventData.eventDates.forEach((eventDate) => {
    // Iterate through each reservation
    eventDate.reservations.forEach((reservation) => {
      // Increment total reservations
      totalReservations++;

      // Sum up payments for this reservation
      const reservationPayments = reservation.order.payments;
      const reservationTotalAmount = reservationPayments.reduce(
        (sum, payment) => sum + payment.paymentAmount,
        0
      );
      totalAmount += reservationTotalAmount;
    });
  });

  console.log(totalReservations);
  console.log(totalAmount);

  return (
    <MainLayout>
      <ReservationLayout
        topContent={<AdminReservationUpperEvent {...eventData} />}
        centerContent={
          <ReservationAllInfo
            totalReservations={totalReservations}
            totalAmount={totalAmount}
            totalSeats={allSeats.length}
          />
          // <AdminReservationSeatContainer
          //   seatsData={allSeats}
          //   selectedSeatsData={userSeats} // 일단 첫번째 eventDate의 좌석으로만 처리
          //   svg={eventData.svg}
          // />
        }
        rightTopContent={<></>}
        rightBottomContent={
          <ReservationCalendarSideBar dateData={eventData.eventDates} />
        }
      />
    </MainLayout>
  );
};

export default AdminDetailPage;
