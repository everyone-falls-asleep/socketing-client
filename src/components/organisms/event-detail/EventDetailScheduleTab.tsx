import ScheduleHeader from "../../molecules/event-detail/ScheduleHeader";
import ScheduleList from "../../molecules/event-detail/ScheduleList";
import { useEventDetail } from "../../../store/EventDetailContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ModalWithForm from "../../molecules/modal-with-form/ModalWithForm";
import { User } from "../../../types/api/user";
import { useState } from "react";
import Button from "../../atoms/buttons/Button";

dayjs.extend(utc);
dayjs.extend(timezone);

const EventDetailScheduleTab = () => {
  const { filteredEvent, selectedDates, setSelectedDates } = useEventDetail();
  const { friends } = useEventDetail();
  const [isFriendRegisterModalOpen, setIsFriendRegisterModalOpen] =
    useState(false);

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
            연석 친구 등록하기 ({friends.length}명)
          </Button>
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
      </div>
      <ModalWithForm<User>
        isOpen={isFriendRegisterModalOpen}
        onClose={() => setIsFriendRegisterModalOpen(false)}
        onSuccess={() => {}}
        formTitle="연석 친구 등록하기"
        fields={[
          {
            name: "email",
            label: "이메일",
            validation: { required: "이메일을 입력해 주세요" },
          },
        ]}
        submitButtonText="친구 추가하기"
        cancelButtonText="취소"
      />
    </>
  );
};

export default EventDetailScheduleTab;
