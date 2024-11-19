import { useEventDetail } from "../../../store/EventDetailContext";

const EventDetailHeader = () => {
  const { event } = useEventDetail();

  if (!event) {
    return null;
  }

  const formattedDate = new Date(event.eventDates[0].date)
    .toISOString()
    .replace("T", " ")
    .slice(0, 16);

  const year = formattedDate.slice(0, 4);
  const month = formattedDate.slice(5, 7);
  const day = formattedDate.slice(8, 10);
  const hour = formattedDate.slice(11, 13);
  const minute = formattedDate.slice(14, 16);

  return (
    <>
      {/* 배경 이미지 컨테이너 */}
      <div
        id="background-image"
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${event.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.5",
        }}
      />

      {/* 기존 콘텐츠 */}
      <div className="relative w-full h-full px-28 py-3 flex items-center bg-gray-100/50">
        <div id="poster-container" className="poster-box">
          <img
            className="h-full object-contain"
            src={event.thumbnail}
            alt="event poster image"
          />
        </div>
        <div
          id="event-title-container"
          className="flex flex-col flex-grow h-full p-4 justify-center items-start"
        >
          <h1 className="text-2xl font-bold py-2">{event.title}</h1>
          <p className="pl-1 font-bold text-stone-700">{event.place}</p>
          <p className="pl-1 font-bold text-stone-700">{event.cast}</p>
          <p className="pl-1 font-bold text-stone-700">
            {year}년 {month}월 {day}일 {hour}시 {minute}분
          </p>
        </div>
      </div>
    </>
  );
};

export default EventDetailHeader;
