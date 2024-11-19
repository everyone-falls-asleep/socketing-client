import { useEventDetail } from "../../../store/EventDetailContext";

const EventDetailAboutTab = () => {
  const { event } = useEventDetail();

  if (!event) {
    return null;
  }

  const formatDateTime = (date: string) => {
    const formattedDate = new Date(date)
      .toISOString()
      .replace("T", " ")
      .slice(0, 16);

    const year = formattedDate.slice(0, 4);
    const month = formattedDate.slice(5, 7);
    const day = formattedDate.slice(8, 10);
    const hour = formattedDate.slice(11, 13);
    const minute = formattedDate.slice(14, 16);

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  return (
    <>
      <div id="event-content-title" className="tab-content-title-container">
        <h2 className="tab-content-title">공연 소개</h2>
      </div>
      <div id="event-about" className="content-container">
        <div
          key={event.id}
          className="event-details p-2 flex justify-start gap-10"
        >
          <div className="h-96 flex justify-center">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-full object-contain rounded-lg"
            />
          </div>

          <div id="event-detail-about-content">
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <div className="pl-2 flex flex-col">
              <div className="flex gap-2">
                <p className="text-gray-600 text-lg font-bold w-24">장소</p>
                <p className="text-gray-600 text-lg">{event.place}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-600 text-lg font-bold w-24">출연</p>
                <p className="text-gray-600 text-lg">{event.cast}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-600 text-lg font-bold w-24">
                  연령 제한
                </p>
                <p className="text-gray-600 text-lg">{event.ageLimit}세 이상</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-600 text-lg font-bold w-24">
                  공연 일정
                </p>
                <p>
                  <ul className="list-disc pl-6">
                    {event.eventDates.map((schedule) => (
                      <li key={schedule.id} className="text-gray-600 text-lg">
                        {formatDateTime(schedule.date)}
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
