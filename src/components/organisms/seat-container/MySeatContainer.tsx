import React from "react";
import MySvgWrapper from "../../../utils/MySvgWrapper";
import MySeatObj from "../../atoms/seats/MySeatObj";
import { Area, OrderSeat } from "../../../types/api/order";

interface SeatContainerProps {
  svg: string;
  seats: OrderSeat[];
  selectedSeatIds: string[] | undefined;
}

const MySeatContainer: React.FC<SeatContainerProps> = ({
  svg,
  seats,
  selectedSeatIds,
}) => {
  const areas: Area[] = [];

  seats.flat().forEach((seat) => {
    if (!areas.some((area) => area.id === seat.area.id)) {
      areas.push({ ...seat.area });
    }
  });

  const renderSeat = (seatData: OrderSeat) => {
    const reservedBy = selectedSeatIds?.includes(seatData.id);
    return <MySeatObj seatData={seatData} reservedBy={reservedBy ?? false} />;
  };

  return (
    <div className="relative h-full">
      <MySvgWrapper
        renderSeat={renderSeat}
        svg={svg}
        seats={seats}
        areas={areas}
      />
    </div>
  );
};

export default MySeatContainer;
