import { useEventDetail } from "../../../store/EventDetailContext";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";

const EventDetailAboutTab = () => {
  const { event } = useEventDetail();

  if (!event) {
    return null;
  }

  return (
    <>
      <div id="event-content-title" className="tab-content-title-container">
        <h2 className="tab-content-title">공연 소개</h2>
      </div>
      <div id="event-about" className="content-container overflow-y-auto">
        <div
          key={event.id}
          className="event-details px-2 md:p-2 flex flex-col md:flex-row justify-start md:gap-10"
        >
          <div className="h-96 flex justify-center">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-full object-contain rounded-lg"
            />
          </div>

          <div id="event-detail-about-content" className="my-4 md:my-0">
            <div className="text-center md:text-start">
              <h2 className="text-2xl font-bold px-1 my-2">{event.title}</h2>
            </div>

            <div className="pl-2 flex flex-col mt-5 gap-1">
              <div className="flex gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">장소</p>
                <p className="text-gray-700 text-lg">{event.place}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">출연</p>
                <p className="text-gray-700 text-lg">{event.cast}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">
                  연령 제한
                </p>
                <p className="text-gray-700 text-lg">{event.ageLimit}세 이상</p>
              </div>
            </div>
            <div className="pl-2 mt-6">
              <div className="flex flex-col gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">
                  공연 일정
                </p>
                <p>
                  <ul className="list-disc pl-6">
                    {event.eventDates.map((schedule) => (
                      <li key={schedule.id} className="text-gray-700 text-lg">
                        {formatToKoreanDateAndTime(schedule.date)}
                      </li>
                    ))}
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailAboutTab;
