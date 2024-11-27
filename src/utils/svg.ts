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
  return Math.min(Math.max(baseSize, 14), 24);
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
  threshold: number = 30 // 무시할 거리 임계값
): string => {
  const allPoints = contours.flatMap((contour) => contour.points);
  if (allPoints.length === 0) return "";

  const center = {
    x: allPoints.reduce((sum, p) => sum + p.x, 0) / allPoints.length,
    y: allPoints.reduce((sum, p) => sum + p.y, 0) / allPoints.length,
  };

  // 패딩 적용
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

  const hull = getConvexHull(paddedPoints);

  // 근접 점들을 병합하는 과정 추가
  const mergedPoints = mergeClosePoints(hull, threshold);

  // 각도가 심하게 변하는 점들만 선택
  const significantPoints = filterSignificantAngles(mergedPoints, 20); // 20도 이상 차이나는 점들만 선택

  return significantPoints.length > 0
    ? `M ${significantPoints[0].x} ${significantPoints[0].y} ` +
        significantPoints
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(" ") +
        " Z"
    : "";
};

// 가까운 점들을 하나로 병합
const mergeClosePoints = (points: Point[], threshold: number): Point[] => {
  const result: Point[] = [];
  let currentGroup: Point[] = [points[0]];

  for (let i = 1; i < points.length; i++) {
    const lastPoint = currentGroup[currentGroup.length - 1];
    const currentPoint = points[i];
    const distance = getDistance(lastPoint, currentPoint);

    if (distance < threshold) {
      currentGroup.push(currentPoint);
    } else {
      // 현재 그룹의 평균점을 결과에 추가
      if (currentGroup.length > 0) {
        result.push(getAveragePoint(currentGroup));
        currentGroup = [currentPoint];
      }
    }
  }

  // 마지막 그룹 처리
  if (currentGroup.length > 0) {
    result.push(getAveragePoint(currentGroup));
  }

  return result;
};

// 유의미한 각도 변화가 있는 점들만 필터링
const filterSignificantAngles = (
  points: Point[],
  angleThreshold: number
): Point[] => {
  if (points.length <= 3) return points;

  const result: Point[] = [points[0]];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const current = points[i];
    const next = points[i + 1];

    const angle = getAngleChange(prev, current, next);

    if (Math.abs(angle) > angleThreshold) {
      result.push(current);
    }
  }

  // 마지막 점은 항상 포함
  result.push(points[points.length - 1]);

  return result;
};

// 두 점 사이의 거리 계산
const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// 점들의 평균 위치 계산
const getAveragePoint = (points: Point[]): Point => {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), {
    x: 0,
    y: 0,
  });
  return {
    x: sum.x / points.length,
    y: sum.y / points.length,
  };
};

// 세 점 사이의 각도 변화 계산 (도단위)
const getAngleChange = (p1: Point, p2: Point, p3: Point): number => {
  const angle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);

  let angleDiff = (angle2 - angle1) * (180 / Math.PI);

  // 각도를 -180 ~ 180 범위로 정규화
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;

  return angleDiff;
};
// Ramer-Douglas-Peucker 알고리즘을 사용한 경로 단순화

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
