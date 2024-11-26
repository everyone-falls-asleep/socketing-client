import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";
import { useEventDetail } from "../../../store/EventDetailContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import Button from "../../atoms/buttons/Button";
import FriendRegisterModal from "./FriendRegisterModal";
import { useMockEventFriendContext } from "../../../mocks/MockEventFriendContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const EventDetailScheduleTab = () => {
  const { filteredEvent, selectedDates, setSelectedDates } = useEventDetail();
  const [isFriendRegisterModalOpen, setIsFriendRegisterModalOpen] =
    useState(false);
  const { eventFriends } = useMockEventFriendContext();

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
        <h2 className="tab-content-title">공연 일정</h2>
      </div>
      <div className="flex px-4 gap-10">
        <div className="w-[50%]">
          <ScheduleHeader
            validDates={validDates}
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        </div>
        <div className="w-[50%] pt-5">
          <Button
            variant="primary"
            onClick={() => setIsFriendRegisterModalOpen(true)}
          >
            연석 친구 등록하기 ({eventFriends.length} 명)
          </Button>
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
      </div>
      <FriendRegisterModal
        isOpen={isFriendRegisterModalOpen}
        onClose={() => setIsFriendRegisterModalOpen(false)}
      />
    </>
  );
};

export default EventDetailScheduleTab;
