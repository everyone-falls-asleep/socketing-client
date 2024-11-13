import React, { useState } from "react";
import Seat from "../../atoms/seats/Seat";
import Container from "../../layout/Container";
import Button from "../../atoms/buttons/Button";

interface SeatData {
  id: string;
  x: number;
  y: number;
  fill?: string;
  stroke?: string;
}

const SeatContainer: React.FC = () => {
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);

  const seatData: SeatData[] = [
    { id: "1", x: 600, y: 50, fill: "blue", stroke: "black" },
    { id: "2", x: 300, y: 300, fill: "blue", stroke: "black" },
    { id: "3", x: 500, y: 400, fill: "blue", stroke: "black" },
  ];

  const handleSeatClick = (seat: SeatData) => {
    setSelectedSeat(seat);
  };

  return (
    <Container width="1000px">
      <div style={{ position: "relative", width: "100%", height: "500px" }}>
        {seatData.map((seat) => (
          <Seat
            key={seat.id}
            x={seat.x}
            y={seat.y}
            fill={seat.fill}
            stroke={seat.stroke}
            width={50}
            height={50}
            onClick={() => handleSeatClick(seat)}
          />
        ))}
      </div>
      {selectedSeat && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 500,
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "1rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Seat {selectedSeat.id} Info</h3>
          <p>X: {selectedSeat.x}</p>
          <p>Y: {selectedSeat.y}</p>
          <Button
            onClick={() => {
              // TODO: 좌석정보 넘겨서 예매 페이지로
            }}
          >
            예매하기
          </Button>
        </div>
      )}
    </Container>
  );
};

export default SeatContainer;
