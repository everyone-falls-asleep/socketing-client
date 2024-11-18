import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import LoginPage from "../components/pages/LoginPage";
import JoinPage from "../components/pages/JoinPage";
import Mypage from "../components/pages/MyPage";
import ReservationConfirmationPage from "../components/pages/ReservationConfirmationPage";
import { WrappedEventDetailPage } from "../components/wrappers/WrappedEventDatailPage";
import WaitingRoomPage from "../components/pages/WatingRoomPage";
import SearchResultsPage from "../components/pages/SearchResultsPage";
import RegisterEventPage from "../components/pages/RegisterEventPage";
import { WrappedReservationPage } from "../components/wrappers/WrappedReservationPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="event/:id" element={<WrappedEventDetailPage />} />
        <Route path="register" element={<RegisterEventPage />} />
        <Route
          path="reservation/:eventId/:eventDateId"
          element={<WrappedReservationPage />}
        />
        <Route
          path="/search-results/:searchTerm"
          element={<SearchResultsPage />}
        />{" "}
        {/* 검색 결과 페이지 */}
        <Route path="waiting" element={<WaitingRoomPage />} />
        <Route
          path="reservation-confirmation"
          element={<ReservationConfirmationPage />}
        />
        <Route
          path="reservation-info"
          element={<ReservationConfirmationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
