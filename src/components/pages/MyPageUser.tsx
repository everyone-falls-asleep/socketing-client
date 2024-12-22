import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import Button from "../atoms/buttons/Button";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";
import MyProfile from "../organisms/Form/MyProfile";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import { getAllOrder } from "../../api/orders/ordersApi";
import { GetAllOrderResponse, GetOrder } from "../../types/api/order";
import { UserContext } from "../../store/UserContext";
import MyMoney from "../organisms/Form/MyMoney";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const MyPageUser = () => {
  const [section, setSection] = useState("my-tickets");
  const [activeTab, setActiveTab] = useState("upcoming"); // 현재 활성화된 탭 상태
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const useOrders = createResourceQuery<GetAllOrderResponse>(
    `my-orders-${userId}`, // 쿼리 키의 기본 이름
    (eventId) => getAllOrder(eventId) // fetchFn으로 getAllOrder 사용
  );
  const { data, isLoading, isError } = useOrders("");

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!data?.data)
    return <ErrorPage errorMessage={fetchErrorMessages.noReservationData} />;

  const reservationData = data.data;
  const currentTime = new Date(); // 현재 시간

  // 지난 공연과 예정된 공연으로 분리
  const pastEvents = reservationData.filter(
    (reservation) =>
      new Date(reservation.eventDate) < currentTime &&
      reservation.orderCanceledAt === null
  );
  const upcomingEvents = reservationData.filter(
    (reservation) =>
      new Date(reservation.eventDate) >= currentTime &&
      reservation.orderCanceledAt === null
  );

  const cancelTickets = reservationData.filter(
    (reservation) => reservation.orderCanceledAt !== null
  );

  const renderReservationList = (events: GetOrder[], emptyMessage: string) => (
    <div className="mb-4">
      <ul className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700 mb-5">
              {emptyMessage}
            </p>
            <Button onClick={() => void navigate("/")}>이벤트 보러가기</Button>
          </div>
        ) : (
          events.map((order) => (
            <li
              key={order.orderId}
              className="p-4 px-6 border border-gray-300 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center space-x-4"
            >
              <div className="flex justify-around items-start m-2">
                <img
                  src={order.eventThumbnail}
                  alt={order.eventTitle}
                  className="md:w-16 h-24 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 pl-3">
                <h3 className="text-lg font-bold text-gray-700 mb-1">
                  {order.eventTitle}
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="inline-block w-8 md:w-14 font-semibold">
                    예매
                  </span>
                  {formatToKoreanDateAndTime(order.orderCreatedAt)}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="inline-block w-8 md:w-14 font-semibold">
                    일정
                  </span>
                  {formatToKoreanDateAndTime(order.eventDate)}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="inline-block w-8 md:w-14 font-semibold">
                    장소
                  </span>
                  {order.eventPlace}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="inline-block w-8 md:w-14 font-semibold">
                    출연
                  </span>
                  {order.eventCast}
                </p>
              </div>
              <Button
                onClick={() => void navigate(`/mypage/detail/${order.orderId}`)}
                className="hidden md:inline-block"
                variant={`${
                  order.orderCanceledAt !== null ? "secondary" : "primary"
                }`}
              >
                {order.orderCanceledAt !== null
                  ? "취소된 티켓"
                  : "예매 정보 보기"}
              </Button>
              <Button
                onClick={() => void navigate(`/mypage/detail/${order.orderId}`)}
                size="sm"
                className="mt-3 md:hidden"
                variant={`${
                  order.orderCanceledAt !== null ? "secondary" : "primary"
                }`}
              >
                {order.orderCanceledAt !== null
                  ? "취소된 티켓"
                  : "예매 정보 보기"}
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
  const renderContent = () => {
    if (section === "my-tickets") {
      if (activeTab === "upcoming") {
        return renderReservationList(
          upcomingEvents,
          "예정된 공연 예매 티켓이 없습니다."
        );
      }
      if (activeTab === "past") {
        return renderReservationList(
          pastEvents,
          "지난 공연 예매 기록이 없습니다."
        );
      }
      if (activeTab === "cancel") {
        return renderReservationList(cancelTickets, "취소된 티켓이 없습니다.");
      }
    } else if (section === "my-profile") {
      if (activeTab === "profile") {
        return <MyProfile />;
      }
      if (activeTab === "money") {
        return <MyMoney />;
      }
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="w-300 flex h-full">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-white shadow-lg text-black lg:flex flex-col p-10">
          <div className="h-16"></div>
          <nav className="space-y-8 text-gray-500">
            <div>
              <p className="text-gray-600 font-bold text-md uppercase mb-3">
                My Tickets
              </p>
              <ul className="space-y-3">
                <li
                  className={`cursor-pointer ${
                    activeTab === "upcoming" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => {
                    setSection("my-tickets");
                    setActiveTab("upcoming");
                  }}
                >
                  예정된 공연
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "past" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => {
                    setSection("my-tickets");
                    setActiveTab("past");
                  }}
                >
                  지난 공연
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "cancel" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => {
                    setSection("my-tickets");
                    setActiveTab("cancel");
                  }}
                >
                  취소된 티켓
                </li>
              </ul>
            </div>
            <div>
              <p className="text-gray-600 font-bold text-md uppercase mb-3">
                My Profile
              </p>
              <ul className="space-y-3">
                <li
                  className={`cursor-pointer ${
                    activeTab === "profile" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => {
                    setSection("my-profile");
                    setActiveTab("profile");
                  }}
                >
                  프로필 보기
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "money" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => {
                    setSection("my-profile");
                    setActiveTab("money");
                  }}
                >
                  나의 보유 금액
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto p-8 ">
            <div>
              <h1 className="hidden lg:inline-block text-2xl font-bold uppercase text-gray-800 mb-3">
                {section === "my-profile" ? "My Profile" : "My Tickets"}
              </h1>
              {/* 모바일 Tabs */}
              <p className="lg:hidden flex justify-around md:justify-start md:gap-6 md:px-2 text-2xl font-bold uppercase text-gray-800 mb-3">
                <span
                  className={`cursor-pointer ${
                    section === "my-tickets" ? "text-rose-500 font-bold" : ""
                  }`}
                  onClick={() => {
                    setSection("my-tickets");
                    setActiveTab("upcoming");
                  }}
                >
                  My Ticket
                </span>{" "}
                <span className="text-rose-500">
                  {section !== "my-profile" ? "◀" : "▶"}{" "}
                </span>
                <span
                  className={`cursor-pointer ${
                    section === "my-profile" ? "text-rose-500 font-bold" : ""
                  }`}
                  onClick={() => {
                    setSection("my-profile");
                    setActiveTab("profile");
                  }}
                >
                  My Profile
                </span>
              </p>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                {section === "my-tickets" ? (
                  <>
                    <button
                      className={`px-3 md:px-6 py-3 font-medium ${
                        activeTab === "upcoming"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      예정된 공연
                    </button>
                    <button
                      className={`px-4 md:px-6 py-3 font-medium ${
                        activeTab === "past"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("past")}
                    >
                      지난 공연
                    </button>
                    <button
                      className={`px-4 md:px-6 py-3 font-medium ${
                        activeTab === "cancel"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("cancel")}
                    >
                      취소된 티켓
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`px-5 md:px-6 py-3 font-medium ${
                        activeTab === "profile"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      프로필 보기
                    </button>
                    <button
                      className={`px-5 md:px-6 py-3 font-medium ${
                        activeTab === "money"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("money")}
                    >
                      나의 보유 금액
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Tab Content */}
            <div className="flex flex-col px-3 md:px-5 h-[calc(100vh-259px)] overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default MyPageUser;
