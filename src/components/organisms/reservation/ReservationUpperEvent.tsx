import { Event } from "../../../types/api/event";

const ReservationUpperEvent = (eventData: Event) => {
  return (
    <div className="flex gap-6 h-full p-4">
      <img
        src={eventData.thumbnail}
        alt="공연 포스터"
        className="h-full object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3">{eventData.title}</h1>
          <div className="space-y-1">
            <p>{eventData.place}</p>
            <p>
              {eventData.eventDates[0].date.split("T")[0] +
                " " +
                eventData.eventDates[0].date.split("T")[1].slice(0, 5)}{" "}
              외 {eventData.eventDates.length - 1}회
            </p>
            <p>{String(eventData.ageLimit)}세 이상</p>
            <p>출연: {eventData.cast}</p>
          </div>
        </div>
        <p className="text-xl font-bold">가격: 99,000원</p>
      </div>
    </div>
  );
};

export default ReservationUpperEvent;
