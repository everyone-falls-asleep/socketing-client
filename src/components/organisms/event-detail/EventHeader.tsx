const EventHeader = () => {
  return (
    <div
      id="event-header"
      className="w-full h-36 px-28 py-3 flex items-center bg-gray-100"
    >
      <div id="poster-container" className="poster-box bg-amber-200">
        <img
          className="h-full object-contain"
          src="https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif"
          alt="콜드플레이 공연 이미지"
        />
      </div>
      <div
        id="event-title-container"
        className="h-full bg-gray-300 p-2 flex items-center"
      >
        <h1 className="text-2xl font-bold">콜드플레이 공연</h1>
      </div>
    </div>
  );
};

export default EventHeader;
