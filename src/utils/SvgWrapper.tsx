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
      // Blue to gray interpolation
      const startColor = { r: 0, g: 122, b: 255 }; // #007AFF
      const endColor = { r: 128, g: 128, b: 128 }; // #808080

      const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);

      return `rgb(${r},${g},${b})`;
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
