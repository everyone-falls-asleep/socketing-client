import MainLayout from "../layout/MainLayout";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { EventsResponse } from "../../types/api/event";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const useEvents = createResourceQuery<EventsResponse>(
    "all-events",
    fetchAllEvents
  );

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noEventData}</p>;

  const eventData = data.data;

  return (
    <MainLayout>
      <h2 className="pt-7 text-3xl font-bold text-center mb-8">
        내가 등록한 공연 목록
      </h2>
      <div className="flex flex-col gap-4">
        {eventData.length > 0 ? (
          eventData.map((event) => (
            <div
              key={event.id}
              className="bg-white flex items-center justify-between px-8 py-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-32 flex-shrink-0">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="inline-block w-16 font-semibold">
                        장소
                      </span>
                      <span>{event.place}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="inline-block w-16 font-semibold">
                        출연
                      </span>
                      <span>{event.cast}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  className={`px-6 py-3 font-bold rounded-lg transition-colors ${"bg-rose-400"}`}
                  onClick={() => navigate(`/admin/${event.id}`)}
                >
                  예매 현황 보기
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">
              티켓팅 오픈 예정인 공연이 없습니다.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminPage;
