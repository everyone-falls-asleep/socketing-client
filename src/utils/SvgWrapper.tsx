import { useState, useEffect, useContext } from "react";
import { AreaSocket, Seat } from "../types/api/socket";
import { ReservationContext } from "../store/ReservationContext";

interface SvgWrapperProps {
  svgString: string;
  seats: Seat[];
  areas: AreaSocket[];
  renderSeat: (seat: Seat) => React.ReactNode;
}

// SVG 데이터의 타입 정의
interface ParsedSvgData {
  svgString: string;
}

function SvgWrapper({ svgString, seats, areas, renderSeat }: SvgWrapperProps) {
  const { joinArea, setSeatsMap, currentAreaId, setCurrentAreaId, exitArea } =
    useContext(ReservationContext);
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

      <g className="areas">
        {areas?.map((area) => (
          <g
            key={area.id}
            dangerouslySetInnerHTML={{ __html: area.svg }}
            onClick={() => {
              if (currentAreaId === area.id) {
                return;
              }
              setSeatsMap(new Map());
              if (currentAreaId !== null) {
                exitArea(currentAreaId);
              }
              joinArea(area.id);
              setCurrentAreaId(area.id);
            }}
          />
        ))}
      </g>

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
