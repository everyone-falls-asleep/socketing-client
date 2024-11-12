import React from "react";

interface CircleSVGProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
  x?: number;
  y?: number;
}

const Seat: React.FC<CircleSVGProps> = ({
  fill,
  stroke,
  width = "800px",
  height = "800px",
  x = 0,
  y = 0,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", left: x, top: y }}
      {...props}
    >
      <g id="Edit / Add_Plus_Circle">
        <path
          id="Vector"
          d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default Seat;
