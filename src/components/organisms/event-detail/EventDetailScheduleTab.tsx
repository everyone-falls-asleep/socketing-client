import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";
import { useEventDetail } from "../../../store/EventDetailContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import FriendRegisterModal from "./FriendRegisterModal";
import { useEventFriendContext } from "../../../store/EventFriendContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const EventDetailScheduleTab = () => {
  const { filteredEvent, selectedDates, setSelectedDates } = useEventDetail();
  const [isFriendRegisterModalOpen, setIsFriendRegisterModalOpen] =
    useState(false);

  const { eventFriends, addFriend, deleteFriend } = useEventFriendContext();

  if (!filteredEvent) {
    return null;
  }

  const validDates =
    filteredEvent.eventDates?.map((eventDate) =>
      dayjs(eventDate.date).tz("Asia/Seoul").toDate()
    ) || [];

  const onDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  return (
    <>
      <div className="tab-content-title-container">
        <h2 className="hidden md:block tab-content-title md:ml-10">
          공연 일정
        </h2>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row ">
        {/* 모바일 반응형 */}
        <div className="md:hidden w-[100%] flex flex-col gap-2 pb-3 border-gray-200 max-h-64 overflow-y-auto">
          <button
            className="bg-black text-white p-1 text-center rounded-lg font-bold transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setIsFriendRegisterModalOpen(true)}
          >
            함께할 친구 등록 ({eventFriends?.length} 명)
          </button>
          <>
            {eventFriends && eventFriends.length > 0 && (
              <div className="flex h-11 p-4 rounded-lg border items-center shadow transition justify-between overflow-x-auto overflow-y-hidden">
                <div className="flex-shrink-0 flex items-center pb-1 justify-center rounded-md gap-3">
                  {eventFriends.map((eventFriend, index) => (
                    <div key={index} className="font-bold">
                      {eventFriend.email.slice(0, 3)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
        {/* 달력 */}
        <div className="calendar mt-1 w-[100%] md:w-[50%]">
          <ScheduleHeader
            validDates={validDates}
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        </div>

        {/* 리스트 */}
        {/* md, lg */}
        <div className="hidden md:flex flex-col gap-2 w-[50%] pt-5">
          <button
            className="bg-black text-white mx-2 p-1 text-center rounded-lg font-bold transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setIsFriendRegisterModalOpen(true)}
          >
            함께할 친구 등록 ({eventFriends?.length} 명)
          </button>

          <>
            {eventFriends && eventFriends.length > 0 && (
              <div className="flex h-auto rounded-lg border items-center shadow-lg transition p-4 mx-2 mb-2 justify-between flex-wrap overflow-y-hidden">
                <div className="flex-wrap flex items-center justify-center rounded-md">
                  {eventFriends.map((eventFriend, index) => (
                    <div key={index} className="p-2 text-lg font-bold">
                      {eventFriend.email.slice(0, 3)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
      </div>
      <FriendRegisterModal
        isOpen={isFriendRegisterModalOpen}
        onClose={() => setIsFriendRegisterModalOpen(false)}
        eventFriends={eventFriends ?? []}
        addFriend={addFriend}
        deleteFriend={deleteFriend}
      />
    </>
  );
};

export default EventDetailScheduleTab;
