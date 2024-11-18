import ReservationPage from "../pages/ReservationPage";
import { ReservationProvider } from "../../store/ReservationContext";

export const WrappedReservationPage = () => (
  <ReservationProvider>
    <ReservationPage />
  </ReservationProvider>
);
