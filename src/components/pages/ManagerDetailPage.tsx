// import { fetchReservationsByEvent } from "../../api/reservations/reservationsApi";
// import { fetchErrorMessages } from "../../constants/errorMessages";
import { useParams } from "react-router-dom";
// import ReservationCalendarSideBar from "../organisms/reservation/ReservationCalendarSideBar";
import ReservationLayout from "../layout/ReservationLayout";
import ReservationAllInfo from "../organisms/reservation/ReservationAllInfo";
import MainLayout from "../layout/MainLayout";
import { EventManagement } from "../../types/api/managers";
import { fetchOneEventForManager } from "../../api/managers/managersApi";
import { useEffect, useState } from "react";
import ManagerReservationUpperEvent from "../organisms/reservation/ManagerReservationUpperEvent";
import ManagerSeatContainer from "../organisms/seat-container/ManagerSeatContainer";
import { useManagerContext } from "../../store/ManagerContext";
import { managerPageErrorMessages } from "../../constants/errorMessages";
import SeatUserInfo from "../molecules/seat-user-info/SeatUserInfo";

const ManagerDetailPage = () => {
  const { eventId, eventDateId } = useParams();
  const [eventData, setEventData] = useState<EventManagement | null>(null);
  const { setSeats, setAreas, svg, setSvg, setTotalSalesAmount } =
    useManagerContext();

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
      const allSeats = response.data.areas?.flatMap((area) => area.seats);
      setSeats(allSeats);
      setAreas(response.data.areas);
      setSvg(response.data.svg);
      setTotalSalesAmount(response.data.totalSales || 0);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    void getEventManagement();
  }, [eventId, eventDateId]);

  if (!eventData || !svg) {
    return <p>{managerPageErrorMessages.isLoading}</p>;
  }

  return (
    <MainLayout>
      <ReservationLayout
        topContent={<ManagerReservationUpperEvent {...eventData} />}
        centerContent={<ManagerSeatContainer />}
        rightTopContent={<ReservationAllInfo />}
        rightBottomContent={<SeatUserInfo />}
      />
    </MainLayout>
  );
};

export default ManagerDetailPage;
