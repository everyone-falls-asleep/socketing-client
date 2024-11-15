import { Event } from "../../../types/api/event";

const ResevationUpperEvent = (eventData: Event) => {
  return (
    <div className="h-1/3 bg-white border-b shadow-sm p-6">
      <div className="flex gap-6 h-full">
        <img
          src={eventData.thumbnail}
          alt="공연 포스터"
          className="h-full object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{eventData.title}</h1>
            <div className="space-y-2">
              <p>{eventData.place}</p>
              <p>
                {eventData.date[0]} 외 {eventData.date.length - 1}회
              </p>
              <p>{eventData.age_limit} 이상</p>
              <p>출연: {eventData.cast}</p>
            </div>
          </div>
          <p className="text-xl font-bold">
            가격: {parseInt(eventData.price).toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResevationUpperEvent;
