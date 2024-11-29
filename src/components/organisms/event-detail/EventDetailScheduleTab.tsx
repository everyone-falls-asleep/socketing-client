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
        <h2 className="tab-content-title md:ml-2">공연 일정</h2>
      </div>
      <div className="flex flex-col items-center md:items-start lg:mt-10 md:flex-row px-4 md:gap-7 lg:gap-10">
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
            연석 친구 등록 ({eventFriends?.length} 명)
          </button>
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
        {/* 모바일 반응형 */}
        <div className="md:hidden w-[100%] flex flex-col gap-2 pt-3 border-t-2 border-gray-200 max-h-64 overflow-y-auto">
          <button
            className="bg-black text-white  p-1 text-center rounded-lg font-bold transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setIsFriendRegisterModalOpen(true)}
          >
            연석 친구 등록 ({eventFriends?.length} 명)
          </button>
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
