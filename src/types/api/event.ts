export interface Event {
  event_id: string;
  title: string;
  date: string[];
  thumbnail: string;
  place: string;
  price: string;
  cast: string;
  age_limit: string;
}

export interface Seat {
  seat_id: string;
  x: string;
  y: string;
  area: string;
  row: string;
  number: string;
  seat_status: "0" | "1" | "2";
  event_id: string;
  date: string;
  price: string;
}

export interface Reservation {
  reservation_id: string;
  seats: Seat[];
  event: Event;
  created_at: string;
  exchange_status: "0" | "1" | "2";
}
