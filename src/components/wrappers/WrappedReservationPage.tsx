import ReservationPage from "../pages/ReservationPage";
import { ReservationProvider } from "../../store/ReservationContext";
import { Route, Routes } from "react-router-dom";
import OrderPage from "../pages/OrderPage";

export const WrappedReservationPage = () => (
  <ReservationProvider>
    <Routes>
      <Route path="" element={<ReservationPage />} />
      <Route
        path="reservation/:eventId/:eventDateId/*"
        element={<OrderPage />}
      />
    </Routes>
  </ReservationProvider>
);
