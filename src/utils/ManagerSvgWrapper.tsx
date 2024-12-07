import { useState, useEffect } from "react";
import { Seat } from "../types/api/managers";
import { useManagerContext } from "../store/ManagerContext";

interface SvgWrapperProps {
  renderSeat: (seat: Seat) => React.ReactNode;
}

interface ParsedSvgData {
  svgString: string;
}

function ManagerSvgWrapper({ renderSeat }: SvgWrapperProps) {
  const [svgContent, setSvgContent] = useState<{
    viewBox: string;
    content: string;
  }>({
    viewBox: "",
    content: "",
  });
  const { areas, seats, svg } = useManagerContext();

  useEffect(() => {
    if (!svg) return;

    try {
      const parsedData = JSON.parse(svg) as ParsedSvgData;
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
  }, [svg]);

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

export default ManagerSvgWrapper;
