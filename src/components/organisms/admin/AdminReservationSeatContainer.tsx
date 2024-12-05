// import { UserSeat, Seat } from "../../../types/api/event";
import { Seat, UserSeat } from "../../../types/api/managers";
import AdminSeatContainer from "./AdminSeatContainer";

interface ReservationSeatContainerProps {
  selectedSeatsData: UserSeat[];
  seatsData: Seat[];
  svg: string;
}

const ReservationSeatContainer: React.FC<ReservationSeatContainerProps> = ({
  selectedSeatsData,
  seatsData,
  svg,
}: ReservationSeatContainerProps) => {
  return (
    <AdminSeatContainer
      seatsData={seatsData}
      selectedSeatsData={selectedSeatsData}
      svg={svg}
      viewBox="0 0 1024 768"
    />
  );
};

export default ReservationSeatContainer;
