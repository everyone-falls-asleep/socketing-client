import { Event } from "../../../types/api/event";

const ReservationUpperEvent = (eventData: Event) => {
  return (
    <div className="flex gap-6 h-full p-5 space-x-6">
      <img
        src={eventData.thumbnail}
        alt="공연 포스터"
        className="h-full object-cover rounded-lg"
      />

      <div className="flex flex-col space-y-1">
        <div>
          <h1 className="text-2xl font-bold mb-2">{eventData.title}</h1>
          <div className="space-y-1 text-gray-700">
            <p>{eventData.place}</p>
            <p>
              {new Date(eventData.eventDates[0].date)
                .toISOString()
                .replace("T", " ")
                .slice(0, 16)}{" "}
              외 {eventData.eventDates.length - 1}회
            </p>
            <p>{String(eventData.ageLimit)}세 이상</p>
            <p>출연: {eventData.cast}</p>
          </div>
        </div>
        <p className="text-xl font-bold text-gray-800">가격: 99,000원</p>
      </div>
    </div>
  );
};

export default ReservationUpperEvent;
