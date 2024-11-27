import { useState, useEffect } from "react";
import { Seat } from "../types/api/socket";

interface SvgWrapperProps {
  svgString: string;
  seats: Seat[];
  renderSeat: (seat: Seat) => React.ReactNode;
}

// SVG 데이터의 타입 정의
interface ParsedSvgData {
  svgString: string;
}

function SvgWrapper({ svgString, seats, renderSeat }: SvgWrapperProps) {
  const [svgContent, setSvgContent] = useState<{
    viewBox: string;
    content: string;
  }>({
    viewBox: "",
    content: "",
  });

  useEffect(() => {
    if (!svgString) return;

    try {
      const parsedData = JSON.parse(svgString) as ParsedSvgData;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = parsedData.svgString;
      const svgElement = tempDiv.querySelector("svg");

      if (svgElement) {
        setSvgContent({
          viewBox: svgElement.getAttribute("viewBox") || "",
          content: Array.from(svgElement.children)
            .filter((child) => {
              return (
                !(child instanceof Element) ||
                !child.classList.contains("seats")
              );
            })
            .map((child) => child.outerHTML)
            .join(""),
        });
      }
    } catch (error) {
      console.error("Error parsing SVG string:", error);
    }
  }, [svgString]);

  if (!svgContent.viewBox) return null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={svgContent.viewBox}
      className="w-full h-full"
    >
      {/* Background and other elements */}
      <g dangerouslySetInnerHTML={{ __html: svgContent.content }} />

      {/* Seats from socket */}
      <g className="seats">
        {seats?.map((seat) => (
          <g key={seat.id} transform={`translate(${seat.cx},${seat.cy})`}>
            {renderSeat(seat)}
          </g>
        ))}
      </g>
    </svg>
  );
}

export default SvgWrapper;
