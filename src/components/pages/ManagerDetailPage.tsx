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
import ManagerSeatContainer from "../organisms/manager/ManagerSeatContainer";
import { useManagerContext } from "../../store/ManagerContext";

const ManagerDetailPage = () => {
  const { eventId, eventDateId } = useParams();
  const [eventData, setEventData] = useState<EventManagement | null>(null);
  const { setSeats, setAreas, svg, setSvg } = useManagerContext();

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
      const allSeats = response.data.areas.flatMap((area) => area.seats);
      setSeats(allSeats);
      setAreas(response.data.areas);
      setSvg(response.data.svg);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    void getEventManagement();
  }, [eventId, eventDateId]);

  if (!eventData || !svg) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <MainLayout>
      <ReservationLayout
        topContent={<ManagerReservationUpperEvent {...eventData} />}
        centerContent={<ManagerSeatContainer />}
        rightTopContent={<ReservationAllInfo />}
        rightBottomContent={
          // <ReservationCalendarSideBar dateData={eventData.eventDates} />
          <></>
        }
      />
    </MainLayout>
  );
};

export default ManagerDetailPage;
