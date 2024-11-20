import { useState, useEffect } from "react";
import { Seat } from "../types/api/socket";

interface SvgWrapperProps {
  svgString: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  seats: Seat[];
  renderSeat: (seat: Seat) => React.ReactNode;
  viewBox?: string;
}

function SvgWrapper({
  svgString,
  onClick,
  seats,
  renderSeat,
  viewBox = "0 0 10240 7680", // 기존 viewBox로 수정
}: SvgWrapperProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!svgString) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.documentElement;

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
      preserveAspectRatio="xMidYMid meet" // 추가: SVG가 컨테이너에 맞게 조정되도록
    >
      <g dangerouslySetInnerHTML={{ __html: svgContent }} />
      {seats?.map(renderSeat)}
    </svg>
  );
}

export default SvgWrapper;
