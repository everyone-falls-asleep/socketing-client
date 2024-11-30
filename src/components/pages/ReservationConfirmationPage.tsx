import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationConfirmationTemplate";
import { useParams } from "react-router-dom";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { NewReservationResponse } from "../../types/api/reservation";
import { fetchOneReservation } from "../../api/reservations/reservationsApi";
import { fetchErrorMessages } from "../../constants/errorMessages";
import MainLayout from "../layout/MainLayout";
const ReservationConfirmationPage = () => {
  const { reservationId } = useParams();

  const useReservation = createResourceQuery<NewReservationResponse>(
    "single-reservation",
    fetchOneReservation
  );

  const { data, isLoading, isError } = useReservation(reservationId);

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noReservationData}</p>;

  const reservationData = data.data;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-10 pt-10">
        <p className="text-center text-xl md:text-2xl font-bold mb-2">
          {"예매가 완료되었습니다."}
        </p>

        {/* 유저테스트를 위한 */}
        <div className="flex flex-col items-center justify-center rounded-md h-[100px] bg-gray-100 space-y-2">
          <label className="text-lg font-bold text-gray-700">
            ❗️❗️설문조사에 참여해주세요 ❗️❗️🙏
          </label>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc2kS5zHgkzFog7PYnzRHwRLWjPIGhBEteYToUZ9IZK1PkAFw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105"
          >
            설문조사 링크 열기
          </a>
        </div>
      </div>
      <ReservationOverviewTemplate
        // title="예매가 완료되었습니다"
        reservation={reservationData}
      />
    </MainLayout>
  );
};

export default ReservationConfirmationPage;
