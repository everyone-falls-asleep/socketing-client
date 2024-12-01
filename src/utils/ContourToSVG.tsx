import React, { useRef, useEffect, useState } from "react";
import { useEventCreate } from "../store/EventCreateContext";
import { Contour, Point } from "../types/components/common";
import { loadOpenCV, processImageWithOpenCV } from "../utils/opencv";
import {
  calculateBoundingBox,
  calculateContourCenter,
  calculateFontSize,
  pointsToSVGPath,
  createOutlinePath,
} from "../utils/svg";

interface ContourToSVGProps {
  imageUrl: string;
  lowThreshold?: number;
  highThreshold?: number;
  minContourArea?: number;
  selectionBox?: {
    start: Point;
    end: Point;
  } | null;
  showAreas?: boolean;
}

const ContourToSVG: React.FC<ContourToSVGProps> = ({
  imageUrl,
  lowThreshold = 50,
  highThreshold = 150,
  minContourArea = 100,
  selectionBox,
  showAreas = true,
}) => {
  const {
    contours,
    setContours,
    selectedContour,
    setSelectedContour,
    selectedContours,
    editMode,
    isImageVisible,
  } = useEventCreate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const [isOpenCVReady, setIsOpenCVReady] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const maxRetries = 3;

  useEffect(() => {
    const initOpenCV = async () => {
      try {
        await loadOpenCV();
        console.log("OpenCV loaded successfully");
        setIsOpenCVReady(true);
      } catch (err) {
        setError("Failed to initialize OpenCV");
        console.error("OpenCV initialization error:", err);
      }
    };

    void initOpenCV();
  }, []);

  const processImage = async (isRetry = false) => {
    if (!canvasRef.current || !window.cv || !isOpenCVReady) {
      console.log("Prerequisites not met");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const newContours = await processImageWithOpenCV(
        canvasRef.current,
        imageUrl,
        lowThreshold,
        highThreshold,
        minContourArea,
        {
          setImageSize,
          calculateBoundingBox,
          calculateContourCenter,
          pointsToSVGPath,
        }
      );
      setContours(newContours);
      setRetryCount(0);
    } catch (err) {
      console.error("Error in processImage:", err);
      if (isRetry && retryCount < maxRetries) {
        setRetryCount((prev) => prev + 1);
      }
      setError("오류가 발생하여 재시도 중 입니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (error && retryCount < maxRetries) {
      const retryTimeout = setTimeout(() => {
        console.log(
          `Automatically retrying... Attempt ${retryCount + 1}/${maxRetries}`
        );
        void processImage(true);
      }, 2000);

      return () => clearTimeout(retryTimeout);
    }
  }, [error, retryCount]);

  useEffect(() => {
    if (isOpenCVReady && imageUrl) {
      console.log("Starting image processing for URL:", imageUrl);
      void processImage();
    }
  }, [isOpenCVReady, imageUrl, lowThreshold, highThreshold, minContourArea]);

  const handleRetry = () => {
    setRetryCount(0);
    void processImage(true);
  };

  const handleContourClick = (e: React.MouseEvent, id: number) => {
    if (!editMode) {
      e.stopPropagation();
      setSelectedContour(selectedContour === id ? null : id);
    }
  };

  const renderContour = (contour: Contour, fillColor: string) => (
    <g key={contour.id}>
      <path
        d={contour.path}
        fill={
          selectedContours.includes(contour.id) ||
          selectedContour === contour.id
            ? "rgba(255, 0, 0, 0.2)"
            : fillColor
        }
        stroke={
          selectedContours.includes(contour.id) ||
          selectedContour === contour.id
            ? "red"
            : "blue"
        }
        strokeWidth={
          selectedContours.includes(contour.id) ||
          selectedContour === contour.id
            ? "3"
            : "2"
        }
        opacity="0.7"
        cursor="pointer"
        onClick={(e) => handleContourClick(e, contour.id)}
      />
      <text
        x={contour.center.x}
        y={contour.center.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
        fontSize={calculateFontSize(contour.boundingBox)}
        fontWeight="bold"
        pointerEvents="none"
      >
        {contour.label}
      </text>
    </g>
  );

  const renderAreaContour = (contour: Contour) => {
    const isSelected =
      selectedContours.includes(contour.id) || selectedContour === contour.id;

    return (
      <g key={contour.id} id={contour.id.toString()}>
        {showAreas && (
          <path
            d={contour.path}
            fill="rgba(105, 114, 201, 0.983)"
            stroke="#f1e5e5"
            strokeWidth={"5"}
            opacity="1"
            cursor="pointer"
            onClick={(e) => handleContourClick(e, contour.id)}
          />
        )}
        <path
          d={contour.path}
          fill="none"
          stroke={isSelected ? "red" : "#f1e5e5"}
          strokeWidth={"3"}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          cursor="pointer"
          onClick={(e) => handleContourClick(e, contour.id)}
        />
        {showAreas && (
          <text
            x={contour.center.x}
            y={contour.center.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={calculateFontSize(contour.boundingBox)}
            fontWeight="bold"
            pointerEvents="none"
          >
            {contour.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full">
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
          <p className="mb-2">{error}</p>
          {retryCount >= maxRetries && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry Processing
            </button>
          )}
        </div>
      )}
      {isProcessing && (
        <div className="text-blue-500 mb-4 p-2 bg-blue-100 rounded">
          {retryCount > 0
            ? `Retrying... Attempt ${retryCount}/${maxRetries}`
            : "Processing image..."}
        </div>
      )}
      {!isOpenCVReady && (
        <div className="text-blue-500 mb-4 p-2 bg-blue-100 rounded">
          Loading OpenCV...
        </div>
      )}

      <div className="relative w-full">
        <canvas ref={canvasRef} className="hidden" />
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
          className="w-full h-full"
        >
          {isImageVisible && (
            <image
              href={imageUrl}
              width={imageSize.width}
              height={imageSize.height}
            />
          )}

          {!isImageVisible && (
            <g className="background-image">
              <path
                d={createOutlinePath(contours, 150)}
                fill="white"
                opacity="1"
                strokeWidth="2"
                stroke="white"
              />
            </g>
          )}
          <g className="contours">
            {contours
              .filter((c) => c.type === "contour")
              .map((contour) => renderContour(contour, "rgb(242, 242, 24)"))}
          </g>

          <g className="seats">
            {contours
              .filter((c) => c.type === "seat")
              .map((contour) => {
                const isSelected =
                  selectedContours.includes(contour.id) ||
                  selectedContour === contour.id;

                return (
                  <g key={contour.id} className="seat">
                    <circle
                      cx={contour.cx}
                      cy={contour.cy}
                      r={contour.r}
                      fill={
                        isSelected
                          ? "rgba(255, 0, 0, 0.2)"
                          : "rgba(0, 255, 26, 0.833)"
                      }
                      stroke={isSelected ? "red" : "gray"}
                      strokeWidth={isSelected ? "3" : "2"}
                      opacity="0.8"
                      cursor="pointer"
                      onClick={(e) => {
                        if (!editMode) {
                          e.stopPropagation();
                          setSelectedContour(contour.id);
                        }
                      }}
                    />

                    {contour.number && contour.number > 0 && (
                      <text
                        x={contour.cx}
                        y={contour.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                        fontSize={calculateFontSize(contour.boundingBox)}
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {contour.number}
                      </text>
                    )}
                  </g>
                );
              })}
          </g>
          <g className="areas">
            {contours.filter((c) => c.type === "area").map(renderAreaContour)}
          </g>

          <g className="polygons">
            {contours
              .filter((c) => c.type === "polygon")
              .map((contour) =>
                renderContour(contour, "rgba(128, 128, 128, 0.5)")
              )}
          </g>
          {selectionBox && (
            <rect
              x={Math.min(selectionBox.start.x, selectionBox.end.x)}
              y={Math.min(selectionBox.start.y, selectionBox.end.y)}
              width={Math.abs(selectionBox.end.x - selectionBox.start.x)}
              height={Math.abs(selectionBox.end.y - selectionBox.start.y)}
              fill="rgba(0, 0, 255, 0.1)"
              stroke="blue"
              strokeWidth="1"
              className="pointer-events-none"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default ContourToSVG;
