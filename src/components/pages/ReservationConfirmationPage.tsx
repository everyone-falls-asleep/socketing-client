import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useLocation } from "react-router";
import MainLayout from "../layout/MainLayout";
import { UpdatedPayment } from "../../types/api/payment";
import ErrorPage from "./ErrorPage";

const ReservationConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { paymentData: UpdatedPayment };
  const paymentData = state.paymentData;
  if (!paymentData) return <ErrorPage errorMessage={"결제 정보가 없습니다"} />;

  return (
    <MainLayout>
      <div className="mx-auto p-5 md:p-10 pt-5 overflow-y-auto ">
        <p className="text-center text-xl md:text-2xl font-bold mb-2">
          {"예매가 완료되었습니다."}
        </p>
        <ReservationOverviewTemplate data={paymentData} />
      </div>
    </MainLayout>
  );
};

export default ReservationConfirmationPage;
