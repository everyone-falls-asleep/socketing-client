import { useState, useEffect } from "react";
import { Seat } from "../types/api/event";

interface SvgWrapperProps {
  svgString: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  seats: Seat[];
  renderSeat: (seat: Seat) => React.ReactNode;
  scale?: number;
  isDateSidebarOpen?: boolean;
  viewBox?: string;
}

function SvgWrapperApi({
  svgString,
  onClick,
  seats,
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
    </svg>
  );
}

export default SvgWrapperApi;
