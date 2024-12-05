import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MainPage from "../components/pages/MainPage";
import BaseMainPage from "../components/pages/MainPage";
import LoginPage from "../components/pages/LoginPage";
import JoinPage from "../components/pages/JoinPage";
import MyPageUser from "../components/pages/MyPageUser";
import ReservationConfirmationPage from "../components/pages/ReservationConfirmationPage";
import { WrappedEventDetailPage } from "../components/wrappers/WrappedEventDatailPage";
import { WrappedWaitingRoomPage } from "../components/wrappers/WrappedWaitingRoomPage";
import SearchResultsPage from "../components/pages/SearchResultsPage";
import RegisterEventPage from "../components/pages/RegisterEventPage";
import { WrappedReservationPage } from "../components/wrappers/WrappedReservationPage";
import AdminDetailPage from "../components/pages/AdminDetailPage";
import MyDetailPage from "../components/pages/MyDetailPage";
import MyPageManager from "../components/pages/MyPageManager";
import PaymentPage from "../components/pages/PaymentPage";
import OrderPage from "../components/pages/OrderPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseMainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="mypage" element={<MyPageUser />} />
        <Route path="event/:id" element={<WrappedEventDetailPage />} />
        <Route path="register" element={<RegisterEventPage />} />
        <Route
          path="reservation/:eventId/:eventDateId"
          element={<WrappedReservationPage />}
        />
        <Route path="order" element={<OrderPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route
          path="search-results/:searchTerm"
          element={<SearchResultsPage />}
        />
        <Route
          path="waiting/:eventId/:eventDateId"
          element={<WrappedWaitingRoomPage />}
        />
        <Route
          path="reservation-confirmation"
          element={<ReservationConfirmationPage />}
        />
        <Route
          path="reservation-info"
          element={<ReservationConfirmationPage />}
        />
        <Route path="admin" element={<MyPageManager />} />
        <Route
          path="admin/:eventId/:eventDateId"
          element={<AdminDetailPage />}
        />
        <Route path="mypage/detail" element={<MyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
