import { Seat, SeatStatus } from "../types/api/socket";

export const getStatusColor = (status: SeatStatus) => {
  switch (status) {
    case "available":
      return "#FFFFFF";
    case "reserved":
      return "#9CA3AF";
    case "selected":
      return "#F66687";
    // case "adjacent":
    //   return "#0a74f5";
    case "temporary_hold":
      return "#FBBF24";
    default:
      return "#9CA3AF";
  }
};

export const getSeatStatus = (
  seatData: Seat,
  eventDateId: string | null,
  currentUserId: string | null
): SeatStatus => {
  if (!eventDateId) return "available";

  const isReserved = seatData.reservations.some(
    (reservation) => reservation.eventDate.id === eventDateId
  );

  if (isReserved) return "reserved";
  if (seatData.selectedBy) {
    if (
      seatData.expirationTime &&
      new Date(seatData.expirationTime) < new Date()
    ) {
      return "available";
    }
    return seatData.selectedBy === currentUserId
      ? "selected"
      : "temporary_hold";
  }
  if (seatData.reservedBy) {
    return "reserved";
  }

  return "available";
};

export const getHoverClass = (status: string) => {
  if (status === "available" || status === "selected") {
    return "hover:opacity-80 cursor-pointer";
  }
  return "cursor-not-allowed";
};
