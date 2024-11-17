import ReservationOverviewTemplate from "../templates/reservation-overview/ReservationOverviewTemplate";

const ReservationConfirmationPage = () => {
  // API로부터 받아온 예매 데이터라고 가정
  const reservationData = {
    user: {
      nickname: "홍길동",
      email: "se1620236@naver.com",
      profileImage: null,
    },
    eventDate: {
      date: "2024-12-01T19:00:00.000Z",
      event: {
        title: "Music Festival",
        thumbnail: "https://example.com/thumbnail.jpg",
        place: "Central Park",
        cast: "Famous Band",
        ageLimit: 18,
      },
    },
    seat: {
      area: 1,
      row: 1,
      number: 3,
    },
  };

  return (
    <ReservationOverviewTemplate
      title="예매가 완료되었습니다"
      reservation={reservationData}
    />
  );
};

export default ReservationConfirmationPage;
