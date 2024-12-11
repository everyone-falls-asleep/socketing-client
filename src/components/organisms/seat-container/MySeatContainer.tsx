import React from "react";
import MySvgWrapper from "../../../utils/MySvgWrapper";
import MySeatObj from "../../atoms/seats/MySeatObj";
import { Area, OrderSeat } from "../../../types/api/order";

interface SeatContainerProps {
  svg: string;
  seats: OrderSeat[];
  selectedSeatIds: string[] | undefined;
  reservedByMe: boolean;
}

const MySeatContainer: React.FC<SeatContainerProps> = ({
  svg,
  seats,
  selectedSeatIds,
  reservedByMe,
}) => {
  const areas: Area[] = [];

  seats.flat().forEach((seat) => {
    if (!areas.some((area) => area.id === seat.area.id)) {
      areas.push({ ...seat.area });
    }
  });

  const renderSeat = (seatData: OrderSeat) => {
    const reserved = selectedSeatIds?.includes(seatData.id);
    return (
      <MySeatObj
        seatData={seatData}
        seatStatus={
          reservedByMe && reserved
            ? "selected"
            : reserved
              ? "reserved"
              : "available"
        }
      />
    );
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
