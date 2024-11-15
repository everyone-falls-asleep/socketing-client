// src/mocks/reservationData.ts

import { Reservation } from "../types/api/event";

export const mockReservationData: Reservation = {
  reservation_id: "1",
  seats: [
    ...Array.from({ length: 32 }, (_, index) => {
      const row = Math.floor(index / 4) + 1; // 1~16행
      const column = index % 4; // 4열 반복
      const x = (9700 - column * 1400).toString(); // 가로 간격 800
      const y = (-600 + row * 1000).toString(); // 세로 간격 400

      return {
        seat_id: `${String.fromCharCode(65 + column)}${row}`,
        x: x,
        y: y,
        area: `${String.fromCharCode(65 + column)}구역`,
        row: `${row}열`,
        number: `${row}번`,
        seat_status: "0" as const,
        event_id: "",
        date: "",
        price: column === 0 ? "129000" : column === 1 ? "159000" : "189000",
      };
    }),
  ],
  event: {
    event_id: "1",
    title: "콜드플레이 내한 공연",
    date: ["2024-12-22 18:00PM", "2024-12-23 18:00PM", "2024-12-24 18:00PM"],
    thumbnail:
      "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
    place: "올림픽 주경기장",
    price: "129000",
    cast: "콜드플레이",
    age_limit: "12세",
  },
  created_at: "2024/11/14 12:33 PM",
  exchange_status: "0",
};
