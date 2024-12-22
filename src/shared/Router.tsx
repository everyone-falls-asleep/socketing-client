import { BrowserRouter, BrowserRouterProps } from "react-router-dom";
import { Route, Routes } from "react-router";
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
// import ManagerDetailPage from "../components/pages/ManagerDetailPage";
import { WrappedManagerDetailPage } from "../components/wrappers/WrappedManagerDetailPage";
import MyDetailPage from "../components/pages/MyDetailPage";
import MyPageManager from "../components/pages/MyPageManager";
import OrderPage from "../components/pages/OrderPage";
import ErrorPage from "../components/pages/ErrorPage";

interface CustomBrowserRouterProps extends BrowserRouterProps {
  future?: {
    v7_relativeSplatPath?: boolean;
    v7_startTransition?: boolean;
  };
}

const CustomBrowserRouter: React.FC<CustomBrowserRouterProps> = (props) => (
  <BrowserRouter {...props} />
);

const Router = () => {
  return (
    <CustomBrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<BaseMainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="mypage" element={<MyPageUser />} />
        <Route path="event/:id" element={<WrappedEventDetailPage />} />
        <Route path="register" element={<RegisterEventPage />} />

        <Route
          path="reservation/:eventId/:eventDateId/*"
          element={<WrappedReservationPage />}
        />

        <Route path="order" element={<OrderPage />} />
        <Route path="error" element={<ErrorPage />} />
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

        <Route path="manager">
          <Route
            path=":eventId/:eventDateId"
            element={<WrappedManagerDetailPage />}
          />
          <Route index element={<MyPageManager />} />
        </Route>

        <Route path="mypage/detail/:orderId" element={<MyDetailPage />} />
      </Routes>
    </CustomBrowserRouter>
  );
};

export default Router;
