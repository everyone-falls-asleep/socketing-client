import { useEventDetail } from "../../../store/EventDetailContext";
import { deleteEvent } from "../../../api/events/eventsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EventDetailHeader = () => {
  const navigate = useNavigate();
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

  const onDeleteHandler = async () => {
    try {
      await deleteEvent(event.id);
      // 캐시 무효화 처리해줄지 고민
      toast.success("공연 삭제가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log("삭제 실패: ", error);
    }
  };

  return (
    <>
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
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 부모 div 클릭 방지
              void onDeleteHandler();
            }}
            className="absolute right-5 bg-transparent border border-red-500 text-red-500 text-xs px-2 py-1 rounded hover:bg-red-500 hover:text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default EventDetailHeader;
