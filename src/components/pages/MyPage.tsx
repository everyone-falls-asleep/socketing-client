import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Button from "../atoms/buttons/Button";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // 현재 활성화된 탭 상태
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="bg-black border-t text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <p className="text-sm mt-2">Home / My Tickets</p>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="flex h-[85%] ">
          {/* Sidebar */}
          <aside className="hidden w-64 bg-white shadow-lg text-black lg:flex flex-col p-6">
            {/* 공간만들기 */}
            <div className="h-16"></div>
            {/* Navigation */}
            {/* Navigation */}
            <nav className="space-y-8 text-gray-500 ">
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
          <main className="flex-1 p-8 shadow-lg bg-white">
            <div className="max-w-4xl mx-auto">
              {/* Page Title */}
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
              {/* 여기를 db와 연결해서 추가 해줘야 함 */}
              {activeTab === "upcoming" && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🗂️</div>
                  <p className="text-lg font-medium text-gray-700">
                    No upcoming events
                  </p>
                  <p className="text-gray-500 mb-6">
                    Tickets you buy will automatically appear here. Browse
                    events to find tickets to something awesome.
                  </p>
                  <Button onClick={() => navigate("/events")} className="">
                    이벤트 보러가기
                  </Button>
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
                  <Button onClick={() => navigate("/events")} className="">
                    이벤트 보러가기
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPage;
