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
  const {
    joinArea,
    setSeatsMap,
    currentAreaId,
    setCurrentAreaId,
    exitArea,
    areaStats,
  } = useContext(ReservationContext);
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

  const getColorByRatio = (totalSeats: number, reservedSeats: number) => {
    const ratio = (totalSeats - reservedSeats) / totalSeats;
    if (ratio > 0.7) return "#4CAF50"; // 70% 이상 남음 - 초록색
    if (ratio > 0.3) return "#FFC107"; // 30-70% 남음 - 노란색
    return "#F44336"; // 30% 미만 남음 - 빨간색
  };

  const modifySvgFill = (svgString: string, areaId: string) => {
    if (!areaStats || areaStats.areaId !== areaId) return svgString;

    const color = getColorByRatio(
      areaStats.totalSeatsNum,
      areaStats.reservedSeatsNum
    );
    return svgString.replace(/fill="[^"]*"/, `fill="${color}"`);
  };

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
            dangerouslySetInnerHTML={{
              __html: modifySvgFill(area.svg, area.id),
            }}
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
