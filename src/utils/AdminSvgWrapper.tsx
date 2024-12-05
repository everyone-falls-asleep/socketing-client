import { useState, useEffect } from "react";
import { Seat, UserSeat } from "../types/api/managers";

interface SvgWrapperProps {
  svgString: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  seats: Seat[];
  selectedSeats: UserSeat[];
  renderSeat: (seat: Seat) => React.ReactNode;
  scale?: number;
  isDateSidebarOpen?: boolean;
  viewBox?: string;
}

function AdminSvgWrapper({
  svgString,
  onClick,
  seats,
  selectedSeats,
  renderSeat,
  viewBox = "0 0 1024 768",
}: SvgWrapperProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!svgString) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.documentElement;

    // 내부 콘텐츠만 추출
    const innerContent = Array.from(svg.children)
      .map((child) => child.outerHTML)
      .join("");

    setSvgContent(innerContent);
  }, [svgString]);

  const flattenedSelectedSeats = selectedSeats.flatMap(
    (userSeat) => userSeat.seats
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      onClick={onClick}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <g dangerouslySetInnerHTML={{ __html: svgContent }} />
      {seats.map(renderSeat)}
      {flattenedSelectedSeats.map(renderSeat)}
    </svg>
  );
}

export default AdminSvgWrapper;
