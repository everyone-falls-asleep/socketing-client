import { Point, Contour } from "../types/components/common";

export const calculateContourCenter = (
  points: Point[]
): { x: number; y: number } => {
  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  const center = {
    x: sum.x / points.length,
    y: sum.y / points.length,
  };

  if (!isPointInside(center, points)) {
    const boundingBox = calculateBoundingBox(points);
    return {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height / 2,
    };
  }

  return center;
};

export const calculateBoundingBox = (
  points: Point[]
): {
  x: number;
  y: number;
  width: number;
  height: number;
} => {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

export const calculateFontSize = (boundingBox: {
  width: number;
  height: number;
}): number => {
  const minDimension = Math.min(boundingBox.width, boundingBox.height);
  const baseSize = minDimension * 0.5;
  return Math.min(Math.max(baseSize, 18), 42);
};

export const pointsToSVGPath = (points: Point[]): string => {
  if (points.length === 0) return "";
  const commands: string[] = [];
  commands.push(`M ${points[0].x} ${points[0].y}`);
  for (let i = 1; i < points.length; i++) {
    commands.push(`L ${points[i].x} ${points[i].y}`);
  }
  commands.push("Z");
  return commands.join(" ");
};

export const createOutlinePath = (
  contours: Contour[],
  padding: number = 20,
  threshold: number = 10 // 점 간 최소 변화량 threshold
): string => {
  const allPoints = contours.flatMap((contour) => contour.points);
  if (allPoints.length === 0) return "";

  // 중심점 계산
  const center = {
    x: allPoints.reduce((sum, p) => sum + p.x, 0) / allPoints.length,
    y: allPoints.reduce((sum, p) => sum + p.y, 0) / allPoints.length,
  };

  // padding 적용
  const paddedPoints = allPoints.map((point) => {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const scale = (distance + padding) / distance;

    return {
      x: center.x + dx * scale,
      y: center.y + dy * scale,
    };
  });

  // Convex Hull 계산
  const outlinePoints = getConvexHull(paddedPoints);

  // 중요한 점들만 선택
  const significantPoints = simplifyPath(outlinePoints, threshold);

  // SVG path string 생성
  return significantPoints.length > 0
    ? `M ${significantPoints[0].x} ${significantPoints[0].y} ` +
        significantPoints
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(" ") +
        " Z"
    : "";
};

// 경로 단순화 함수
const simplifyPath = (points: Point[], threshold: number): Point[] => {
  if (points.length <= 2) return points;

  const result: Point[] = [points[0]];
  let lastPoint = points[0];

  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i];
    const dx = Math.abs(currentPoint.x - lastPoint.x);
    const dy = Math.abs(currentPoint.y - lastPoint.y);

    const isSignificantChange = dx > threshold || dy > threshold;
    const isLastPoint = i === points.length - 1;
    const isDirectionChange =
      i < points.length - 1 &&
      isSignificantDirectionChange(lastPoint, currentPoint, points[i + 1], 45);

    if (isSignificantChange || isLastPoint || isDirectionChange) {
      result.push(currentPoint);
      lastPoint = currentPoint;
    }
  }

  return result;
};

// 방향 변화 감지 함수
const isSignificantDirectionChange = (
  p1: Point,
  p2: Point,
  p3: Point,
  angleThreshold: number
): boolean => {
  const angle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);

  let angleDiff = Math.abs((angle2 - angle1) * (180 / Math.PI));
  if (angleDiff > 180) angleDiff = 360 - angleDiff;

  return angleDiff > angleThreshold;
};

const getConvexHull = (points: Point[]): Point[] => {
  if (points.length < 3) return points;

  let start = points[0];
  for (let i = 1; i < points.length; i++) {
    if (
      points[i].y < start.y ||
      (points[i].y === start.y && points[i].x < start.x)
    ) {
      start = points[i];
    }
  }

  const sorted = points
    .filter((p) => p !== start)
    .map((p) => ({
      point: p,
      angle: Math.atan2(p.y - start.y, p.x - start.x),
    }))
    .sort((a, b) => a.angle - b.angle)
    .map((p) => p.point);

  const hull = [start];
  for (const point of sorted) {
    while (
      hull.length >= 2 &&
      !isLeftTurn(hull[hull.length - 2], hull[hull.length - 1], point)
    ) {
      hull.pop();
    }
    hull.push(point);
  }

  return hull;
};

const isLeftTurn = (a: Point, b: Point, c: Point): boolean => {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0;
};

const isPointInside = (point: Point, vertices: Point[]): boolean => {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x,
      yi = vertices[i].y;
    const xj = vertices[j].x,
      yj = vertices[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};
