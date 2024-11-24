import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Button from "../atoms/buttons/Button";
import { fetchReservationsByUser } from "../../api/reservations/reservationsApi";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { Reservation, ReservationsResponse } from "../../types/api/reservation";

const MyPage = () => {
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

  interface GroupedReservation {
    [date: string]: Reservation[];
  }

  const GroupByEventDate = (data: Reservation[]): GroupedReservation => {
    return data.reduce((acc: GroupedReservation, item: Reservation) => {
      const eventDate = item.eventDate.date;
      if (!acc[eventDate]) {
        acc[eventDate] = [];
      }
      acc[eventDate].push(item);
      return acc;
    }, {});
  };

  const reservationByDate = GroupByEventDate(reservationData);

  return (
    <MainLayout>
      <div className="bg-black border-t text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <p className="text-sm mt-2">Home / My Tickets</p>
        </div>
      </div>
      <div className="w-300 h-screen items-center justify-center">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="hidden w-64 bg-white shadow-lg text-black lg:flex flex-col p-6">
            <div className="h-16"></div>
            <nav className="space-y-8 text-gray-500">
              <div>
                <p className="text-gray-600 font-bold text-md uppercase mb-3">
                  My Tickets
                </p>
                <ul className="space-y-3">
                  <li
                    className={`cursor-pointer font-bold ${
                      activeTab === "upcoming" ? "text-rose-400 font-bold" : ""
                    } hover:text-rose-500`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Upcoming Events
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "past" ? "text-rose-400 font-bold" : ""
                    } hover:text-rose-400`}
                    onClick={() => setActiveTab("past")}
                  >
                    Past Events
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-gray-600 font-bold text-md uppercase mb-3">
                  My Profile
                </p>
                <ul className="space-y-3">
                  <li
                    className="cursor-pointer hover:text-rose-400"
                    onClick={() => navigate("/my-profile")}
                  >
                    View Profile
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                My Tickets
              </h1>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === "upcoming"
                      ? "border-b-2 border-rose-400 text-rose-400"
                      : "text-gray-500 hover:text-rose-400"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming Events
                </button>
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === "past"
                      ? "border-b-2 border-rose-400 text-rose-400"
                      : "text-gray-500 hover:text-rose-400"
                  }`}
                  onClick={() => setActiveTab("past")}
                >
                  Past Events
                </button>
              </div>

              {/* Tab Content */}
              <div className="h-[calc(100vh-160px)] overflow-y-auto">
                {activeTab === "upcoming" && (
                  <div>
                    {Object.keys(reservationByDate).length === 0 ? (
                      <div className="text-center">
                        <div className="text-gray-400 text-6xl mb-4">🗂️</div>
                        <p className="text-lg font-medium text-gray-700">
                          No upcoming events
                        </p>
                        <p className="text-gray-500 mb-6">
                          Tickets you buy will automatically appear here. Browse
                          events to find tickets to something awesome.
                        </p>
                        <Button
                          onClick={() => navigate("/events")}
                          className=""
                        >
                          이벤트 보러가기
                        </Button>
                      </div>
                    ) : (
                      Object.entries(reservationByDate).map(
                        ([date, reservations]) => (
                          <div key={date} className="mb-8">
                            <ul className="space-y-4">
                              {reservations.map((reservation: Reservation) => (
                                <li
                                  key={reservation.id}
                                  className="p-4 border border-gray-300 rounded-lg shadow-sm flex items-center space-x-4"
                                >
                                  <img
                                    src={reservation.eventDate.event?.thumbnail}
                                    alt={reservation.eventDate.event?.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-700">
                                      📆{" "}
                                      {new Date(
                                        reservation.eventDate.date
                                      ).toLocaleDateString()}
                                    </h3>
                                    <h3 className="text-lg font-bold text-gray-700 mb-1">
                                      {reservation.eventDate.event?.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      장소 |{" "}
                                      {reservation.eventDate.event?.place}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      출연 | {reservation.eventDate.event?.cast}
                                    </p>
                                  </div>
                                  <Button
                                    onClick={() =>
                                      navigate("/mypage/detail", {
                                        state: { reservation: reservation },
                                      })
                                    }
                                    className="text-white-500 hover:underline ml-auto"
                                  >
                                    예약 상세정보 보기
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )
                    )}
                  </div>
                )}
                {activeTab === "past" && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🕰️</div>
                    <p className="text-lg font-medium text-gray-700">
                      No past events
                    </p>
                    <p className="text-gray-500 mb-6">
                      Tickets you bought will appear here after the event has
                      ended.
                    </p>
                    <Button onClick={() => navigate("/")}>
                      이벤트 보러가기
                    </Button>
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

export default MyPage;
