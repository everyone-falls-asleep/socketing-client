import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Button from "../atoms/buttons/Button";
import { fetchReservationsByUser } from "../../api/reservations/reservationsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { ReservationsResponse } from "../../types/api/reservation";
import MyProfile from "../organisms/Form/MyProfile";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";

const MyPageUser = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // 현재 활성화된 탭 상태
  const navigate = useNavigate();

  const useEvents = createResourceQuery<ReservationsResponse>(
    "reserved-events-by-user",
    fetchReservationsByUser
  );

  const { data, isLoading, isError } = useEvents(
    localStorage.getItem("authToken") ?? ""
  );

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noReservationData}</p>;

  const reservationData = data.data;
  const currentTime = new Date(); // 현재 시간

  // 지난 공연과 예정된 공연으로 분리
  const pastEvents = reservationData.filter(
    (reservation) => new Date(reservation.eventDate.date) < currentTime
  );
  const upcomingEvents = reservationData.filter(
    (reservation) => new Date(reservation.eventDate.date) >= currentTime
  );

  return (
    <MainLayout>
      <div className="w-300 h-[calc(100vh-132px)]">
        <div className="flex h-full">
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
                    onClick={() => setActiveTab("upcoming")}
                  >
                    예정된 공연
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "past" ? "text-rose-400 font-bold" : ""
                    } hover:text-rose-500`}
                    onClick={() => setActiveTab("past")}
                  >
                    지난 공연
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
                    onClick={() => setActiveTab("profile")}
                  >
                    프로필 보기
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="hidden md:inline-block text-2xl font-bold uppercase text-gray-800 mb-3">
                {activeTab === "profile" ? "My Profile" : "My Tickets"}
              </h1>
              <p className="md:hidden flex justify-around text-2xl font-bold uppercase text-gray-800 mb-3">
                <span
                  className={`cursor-pointer ${
                    activeTab !== "profile" ? "text-rose-500 font-bold" : ""
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  My Ticket
                </span>{" "}
                <span className="text-rose-500">
                  {activeTab !== "profile" ? "◀" : "▶"}{" "}
                </span>
                <span
                  className={`cursor-pointer ${
                    activeTab === "profile" ? "text-rose-500 font-bold" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  My Profile
                </span>
              </p>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                {activeTab !== "profile" ? (
                  <>
                    <button
                      className={`px-6 py-3 font-medium ${
                        activeTab === "upcoming"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      예정된 공연
                    </button>
                    <button
                      className={`px-6 py-3 font-medium ${
                        activeTab === "past"
                          ? "border-b-2 border-rose-400 text-rose-400"
                          : "text-gray-500 hover:text-rose-400"
                      }`}
                      onClick={() => setActiveTab("past")}
                    >
                      지난 공연
                    </button>
                  </>
                ) : (
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "profile"
                        ? "border-b-2 border-rose-400 text-rose-400"
                        : "text-gray-500 hover:text-rose-400"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    프로필 보기
                  </button>
                )}
              </div>

              {/* Tab Content */}
              <div className="flex flex-col h-[calc(100vh-300px)] px-3 md:px-5 overflow-y-auto">
                {activeTab === "upcoming" && (
                  <div className="mb-4">
                    <ul className="space-y-4">
                      {upcomingEvents.length === 0 ? (
                        <div className="text-center">
                          <div className="text-gray-400 text-6xl mb-4"></div>
                          <p className="text-2xl font-bold text-gray-700 mb-5">
                            예정된 공연 예매 티켓이 없습니다
                          </p>
                          <Button onClick={() => navigate("/")} className="">
                            이벤트 보러가기
                          </Button>
                        </div>
                      ) : (
                        upcomingEvents.map((reservation) => (
                          <li
                            key={reservation.id}
                            className="p-4 px-6 border border-gray-300 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center space-x-4"
                          >
                            <div className="flex justify-around items-start m-2">
                              <img
                                src={reservation.eventDate.event?.thumbnail}
                                alt={reservation.eventDate.event?.title}
                                className="md:w-16 h-24 rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1 pl-3">
                              <h3 className="text-lg font-bold text-gray-700 mb-1">
                                {reservation.eventDate.event?.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  일정
                                </span>
                                {formatToKoreanDateAndTime(
                                  reservation.eventDate.date
                                )}
                              </p>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  장소
                                </span>
                                {reservation.eventDate.event?.place}
                              </p>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  출연
                                </span>
                                {reservation.eventDate.event?.cast}
                              </p>
                            </div>
                            <Button
                              onClick={() =>
                                navigate("/mypage/detail", {
                                  state: { reservation: reservation },
                                })
                              }
                              className="hidden md:inline-block"
                            >
                              예매 정보 보기
                            </Button>
                            <Button
                              onClick={() =>
                                navigate("/mypage/detail", {
                                  state: { reservation: reservation },
                                })
                              }
                              size="sm"
                              className="mt-3 md:hidden"
                            >
                              예매 정보 보기
                            </Button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
                {activeTab === "past" && (
                  <div className="mb-4">
                    <ul className="space-y-4">
                      {pastEvents.length === 0 ? (
                        <div className="text-center">
                          <div className="text-gray-400 text-6xl mb-4"></div>
                          <p className="text-2xl font-bold text-gray-700 mb-5">
                            지난 공연 예매 기록이 없습니다
                          </p>
                          <Button onClick={() => navigate("/")} className="">
                            이벤트 보러가기
                          </Button>
                        </div>
                      ) : (
                        pastEvents.map((reservation) => (
                          <li
                            key={reservation.id}
                            className="p-4 px-6 border border-gray-300 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center space-x-4"
                          >
                            <div className="flex justify-around items-start m-2">
                              <img
                                src={reservation.eventDate.event?.thumbnail}
                                alt={reservation.eventDate.event?.title}
                                className="md:w-16 h-24 rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1 pl-3">
                              <h3 className="text-lg font-bold text-gray-700 mb-1">
                                {reservation.eventDate.event?.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  일정
                                </span>
                                {formatToKoreanDateAndTime(
                                  reservation.eventDate.date
                                )}
                              </p>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  장소
                                </span>
                                {reservation.eventDate.event?.place}
                              </p>
                              <p className="text-sm text-gray-500">
                                <span className="inline-block w-8 md:w-14 font-semibold">
                                  출연
                                </span>
                                {reservation.eventDate.event?.cast}
                              </p>
                            </div>
                            <Button
                              onClick={() =>
                                navigate("/mypage/detail", {
                                  state: { reservation: reservation },
                                })
                              }
                              className="hidden md:inline-block"
                            >
                              예매 정보 보기
                            </Button>
                            <Button
                              onClick={() =>
                                navigate("/mypage/detail", {
                                  state: { reservation: reservation },
                                })
                              }
                              size="sm"
                              className="mt-3 md:hidden"
                            >
                              예매 정보 보기
                            </Button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
                {activeTab === "profile" && (
                  <div>
                    <MyProfile></MyProfile>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPageUser;
