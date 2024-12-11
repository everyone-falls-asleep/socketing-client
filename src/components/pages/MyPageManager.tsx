import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/buttons/Button";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { managerPageErrorMessages } from "../../constants/errorMessages";
import MyProfile from "../organisms/Form/MyProfile";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import { fetchAllEventForManager } from "../../api/managers/managersApi";
import { AllEventManagementResponse } from "../../types/api/managers";

const MyPageManager = () => {
  const [activeTab, setActiveTab] = useState("ongoing"); // 현재 활성화된 탭 상태
  const navigate = useNavigate();

  const useEvents = createResourceQuery<AllEventManagementResponse>(
    "created-events-by-manager",
    fetchAllEventForManager
  );

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <p>{managerPageErrorMessages.isLoading}</p>;
  if (isError) return <p>{managerPageErrorMessages.general}</p>;
  if (!data?.data) return <p>{managerPageErrorMessages.noEventData}</p>;

  const eventData = data.data;
  const currentTime = new Date(); // 현재 시간

  // 티켓팅 진행중인 공연과 마감된 공연으로 분리
  const pastEvents = eventData.filter(
    (event) => new Date(event.eventDates![0].date) < currentTime
  );
  const ongoingEvents = eventData.filter(
    (event) => new Date(event.eventDates![0].date) >= currentTime
  );

  return (
    <>
      <div className="w-300 flex h-full">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-white shadow-lg text-black lg:flex flex-col p-10">
          <div className="h-16"></div>
          <nav className="space-y-8 text-gray-500">
            <div>
              <p className="text-gray-600 font-bold text-md uppercase mb-3">
                My Events
              </p>
              <ul className="space-y-3">
                <li
                  className={`cursor-pointer ${
                    activeTab === "ongoing" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => setActiveTab("ongoing")}
                >
                  티켓팅 중인 공연
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "past" ? "text-rose-400 font-bold" : ""
                  } hover:text-rose-500`}
                  onClick={() => setActiveTab("past")}
                >
                  마감된 공연
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
            <h1 className="text-2xl font-bold uppercase text-gray-800 mb-3">
              {activeTab === "profile" ? "My Profile" : "My Events"}
            </h1>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              {activeTab !== "profile" ? (
                <>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "ongoing"
                        ? "border-b-2 border-rose-400 text-rose-400"
                        : "text-gray-500 hover:text-rose-400"
                    }`}
                    onClick={() => setActiveTab("ongoing")}
                  >
                    티켓팅 중인 공연
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "past"
                        ? "border-b-2 border-rose-400 text-rose-400"
                        : "text-gray-500 hover:text-rose-400"
                    }`}
                    onClick={() => setActiveTab("past")}
                  >
                    마감된 공연
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
              {activeTab === "ongoing" && (
                <div className="mb-4">
                  <ul className="space-y-4">
                    {ongoingEvents.length === 0 ? (
                      <div className="text-center">
                        <div className="text-gray-400 text-6xl mb-4"></div>
                        <p className="text-2xl font-bold text-gray-700 mb-5">
                          티켓팅 오픈 예정인 공연이 없습니다.
                        </p>
                      </div>
                    ) : (
                      ongoingEvents.map((event) => (
                        <li
                          key={event.id}
                          className="p-4 px-6 border border-gray-300 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center space-x-4"
                        >
                          <div className="flex justify-around items-start m-2">
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="md:w-16 h-24 rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1 pl-3">
                            <h3 className="text-lg font-bold text-gray-700 mb-1">
                              {event.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                일정
                              </span>{" "}
                              {formatToKoreanDateAndTime(
                                event.eventDates![0].date
                              )}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                장소
                              </span>
                              {event.place}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                출연
                              </span>
                              {event.cast}
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              navigate(
                                `/manager/${event.id}/${event.eventDates![0].id}`
                              )
                            }
                            className="hidden md:inline-block"
                            disabled={
                              new Date(event.ticketingStartTime) > currentTime
                            }
                          >
                            예매 현황 보기
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(
                                `/manager/${event.id}/${event.eventDates![0].id}`
                              )
                            }
                            size="sm"
                            className="mt-3 md:hidden"
                            disabled={
                              new Date(event.ticketingStartTime) > currentTime
                            }
                          >
                            예매 현황 보기
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
                          티켓팅이 마감된 공연이 없습니다.
                        </p>
                      </div>
                    ) : (
                      pastEvents.map((event) => (
                        <li
                          key={event.id}
                          className="p-4 px-6 border border-gray-300 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center space-x-4"
                        >
                          <div className="flex justify-around items-start m-2">
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="md:w-16 h-24 rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1 pl-3">
                            <h3 className="text-lg font-bold text-gray-700 mb-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                일정
                              </span>{" "}
                              {formatToKoreanDateAndTime(
                                event.eventDates![0]?.date
                              )}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                장소
                              </span>
                              {event.place}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="inline-block w-8 md:w-14 font-semibold">
                                출연
                              </span>
                              {event.cast}
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              navigate(
                                `/manager/${event.id}/${event.eventDates![0].id}`
                              )
                            }
                            variant="dark"
                            className="hidden md:inline-block"
                          >
                            전체 예매 결과
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(
                                `/manager/${event.id}/${event.eventDates![0].id}`
                              )
                            }
                            variant="dark"
                            size="sm"
                            className="mt-3 md:hidden"
                          >
                            전체 예매 결과
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
    </>
  );
};

export default MyPageManager;
