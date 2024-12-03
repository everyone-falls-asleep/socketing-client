import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useLocation } from "react-router-dom";
import { OrderResponseData } from "../../types/api/socket";
import MainLayout from "../layout/MainLayout";

const MyDetailPage = () => {
  const location = useLocation();
  const state = location.state as { order: OrderResponseData };
  const order = state.order;

  return (
    <>
      <MainLayout>
        <ReservationOverviewTemplate data={order} />;
      </MainLayout>
    </>
  );
};

export default MyDetailPage;
