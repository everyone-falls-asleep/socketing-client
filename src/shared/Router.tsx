import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import LoginPage from "../components/pages/LoginPage";
import JoinPage from "../components/pages/JoinPage";
import Mypage from "../components/pages/MyPage";
import ReservationPage from "../components/pages/ReservationPage";
import ReservationConfirmationPage from "../components/pages/ReservationConfirmationPage";
import EventDetailPage from "../components/pages/EventDetailPage";
import WaitingRoomPage from "../components/pages/WatingRoomPage";
import SearchResultsPage from "../components/pages/SearchResultsPage";
import RegisterEventPage from "../components/pages/RegisterEventPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
        <Route path="register" element={<RegisterEventPage />} />
        <Route path="reservation/:id" element={<ReservationPage />} />
        <Route
          path="/search-results/:searchTerm"
          element={<SearchResultsPage />}
        />{" "}
        {/* 검색 결과 페이지 */}
        <Route path="waiting" element={<WaitingRoomPage />} />
        <Route
          path="reservation-confirmation"
          element={
            <ReservationConfirmationPage title="예매가 완료되었습니다." />
          }
        />
        <Route
          path="reservation-info"
          element={<ReservationConfirmationPage title="예매 정보" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
