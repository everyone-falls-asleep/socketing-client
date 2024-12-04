import { useState, useEffect, useContext } from "react";
import { AreaSocket, Seat } from "../types/api/socket";
import { ReservationContext } from "../store/ReservationContext";

interface SvgWrapperProps {
  svgString: string;
  seats: Seat[];
  areas: AreaSocket[];
  renderSeat: (seat: Seat) => React.ReactNode;
}

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

  useEffect(() => {
    if (!areaStats) return;

    const interpolateColor = (ratio: number) => {
      // 0-1 사이의 값을 3개 구역으로 나눔
      if (ratio <= 0.5) {
        return "rgba(8, 79, 206, 0.983)"; // 원래 시작색
      } else if (ratio > 0.5 && ratio < 1) {
        return "rgba(132, 162, 229, 0.991)"; // 중간 색상
      } else {
        return "rgba(183, 183, 183, 1)"; // 끝색(회색)
      }
    };

    areaStats.forEach((stat) => {
      const areaElement = document.querySelector(
        `.areas [class='${stat.areaId}'] .area-data`
      );
      if (areaElement) {
        const ratio = stat.reservedSeatsNum / stat.totalSeatsNum;
        const color = interpolateColor(ratio);
        (areaElement as SVGPathElement).setAttribute("fill", color);
      }
    });
  }, [areaStats]);

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
            className={area.id}
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
