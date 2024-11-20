import { Event } from "../../../types/api/event";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";

const ReservationUpperEvent = (eventData: Event) => {
  return (
    <div className="flex gap-6 h-full px-8 py-2 md:space-x-6">
      <img
        src={eventData.thumbnail}
        alt="공연 포스터"
        className="h-full object-cover rounded-lg"
      />

      <div className="flex flex-col justify-center">
        <div className="space-y-3">
          <div className="flex items-end mb-2 gap-2">
            <h1 className="text-2xl font-bold">{eventData.title}</h1>
            <p className="text-base font-bold text-gray-700">99,000원</p>
          </div>
          <div className="space-y-1 text-gray-700">
            <div className="flex flex-col md:flex-row gap-1 md:gap-5">
              <div className="flex gap-2">
                <p className="font-bold">장소</p>
                <p>{eventData.place}</p>
              </div>
              <div className="flex  gap-2">
                <p className="font-bold">시간</p>
                <p>
                  {formatToKoreanDateAndTime(eventData.eventDates[0].date)}
                  {eventData.eventDates.length > 1 &&
                    ` 외 ${eventData.eventDates.length - 1}회`}{" "}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">출연</p>
                <p>{eventData.cast}</p>
              </div>
              {/* <p>{String(eventData.ageLimit)}세 이상</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationUpperEvent;
