export const getTimeLeft = (
  ticketingStartTime: number | undefined,
  now: number
): string => {
  if (!ticketingStartTime) return "예정된 티켓팅이 없습니다.";
  const difference = ticketingStartTime - now;

  if (difference <= 0) return "예매가 시작되었습니다!";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `${days > 0 ? `${days}일 ` : ""}${hours}시간 ${minutes}분 ${seconds}초`;
};
