import { Point, Contour, BoundingBox } from "../types/components/common";

// OpenCV 내부에서 사용할 타입 정의
interface OpenCVSize {
  width: number;
  height: number;
}

interface Mat {
  rows: number;
  cols: number;
  data: Uint8Array | Int32Array | Float32Array;
  data32S: Int32Array;
  delete(): void;
}

interface MatVector {
  size(): number;
  get(index: number): Mat;
  delete(): void;
}

interface OpenCV {
  Mat: new () => Mat;
  MatVector: new () => MatVector;
  Size: new (width: number, height: number) => OpenCVSize;

  COLOR_RGBA2GRAY: number;
  CV_8UC4: number;
  MORPH_RECT: number;
  MORPH_CLOSE: number;
  RETR_EXTERNAL: number;
  CHAIN_APPROX_SIMPLE: number;

  matFromArray(
    rows: number,
    cols: number,
    type: number,
    array: Uint8ClampedArray
  ): Mat;
  cvtColor(src: Mat, dst: Mat, code: number): void;
  GaussianBlur(src: Mat, dst: Mat, ksize: OpenCVSize, sigmaX: number): void;
  Canny(
    src: Mat,
    dst: Mat,
    threshold1: number,
    threshold2: number,
    apertureSize?: number
  ): void;
  getStructuringElement(shape: number, ksize: OpenCVSize): Mat;
  morphologyEx(src: Mat, dst: Mat, op: number, kernel: Mat): void;
  findContours(
    image: Mat,
    contours: MatVector,
    hierarchy: Mat,
    mode: number,
    method: number
  ): void;
  contourArea(contour: Mat): number;
  arcLength(curve: Mat, closed: boolean): number;
  approxPolyDP(
    curve: Mat,
    approxCurve: Mat,
    epsilon: number,
    closed: boolean
  ): void;
}

declare global {
  interface Window {
    cv: OpenCV;
    cvScriptLoaded: boolean;
  }
}

interface ProcessCallbacks {
  setImageSize: (size: { width: number; height: number }) => void;
  calculateBoundingBox: (points: Point[]) => BoundingBox;
  calculateContourCenter: (points: Point[]) => Point;
  pointsToSVGPath: (points: Point[]) => string;
}

let openCVPromise: Promise<void> | null = null;

export const loadOpenCV = async (): Promise<void> => {
  if (openCVPromise) return openCVPromise;

  openCVPromise = new Promise((resolve, reject) => {
    if (window.cv) {
      resolve();
      return;
    }

    if (window.cvScriptLoaded) {
      const checkCv = setInterval(() => {
        if (window.cv) {
          clearInterval(checkCv);
          resolve();
        }
      }, 100);
      return;
    }

    window.cvScriptLoaded = true;
    console.log("loading opencv");
    const script = document.createElement("script");
    script.src = "https://docs.opencv.org/4.8.0/opencv.js";
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      const checkCv = setInterval(() => {
        if (window.cv) {
          clearInterval(checkCv);
          resolve();
        }
      }, 100);
    };

    script.onerror = () => {
      window.cvScriptLoaded = false;
      openCVPromise = null;
      reject(new Error("Failed to load OpenCV.js"));
    };

    document.body.appendChild(script);
  });

  return openCVPromise;
};

export const processImageWithOpenCV = async (
  canvas: HTMLCanvasElement,
  imageUrl: string,
  lowThreshold: number,
  highThreshold: number,
  minContourArea: number,
  callbacks: ProcessCallbacks
): Promise<Contour[]> => {
  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });

  callbacks.setImageSize({ width: img.width, height: img.height });

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Failed to get 2D context");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const src = window.cv.matFromArray(
    imageData.height,
    imageData.width,
    window.cv.CV_8UC4,
    new Uint8ClampedArray(imageData.data)
  );

  const gray = new window.cv.Mat();
  const edges = new window.cv.Mat();
  const hierarchy = new window.cv.Mat();
  const contoursMat = new window.cv.MatVector();

  try {
    window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
    window.cv.GaussianBlur(gray, gray, new window.cv.Size(3, 3), 0);
    window.cv.Canny(gray, edges, lowThreshold, highThreshold, 3);

    const kernel = window.cv.getStructuringElement(
      window.cv.MORPH_RECT,
      new window.cv.Size(2, 2)
    );

    const processed = new window.cv.Mat();
    window.cv.morphologyEx(edges, processed, window.cv.MORPH_CLOSE, kernel);

    window.cv.findContours(
      processed,
      contoursMat,
      hierarchy,
      window.cv.RETR_EXTERNAL,
      window.cv.CHAIN_APPROX_SIMPLE
    );

    const newContours: Contour[] = [];
    for (let i = 0; i < contoursMat.size(); ++i) {
      const contour = contoursMat.get(i);
      const area = window.cv.contourArea(contour);

      if (area < minContourArea) continue;

      const epsilon = 0.001 * window.cv.arcLength(contour, true);
      const approxCurve = new window.cv.Mat();
      window.cv.approxPolyDP(contour, approxCurve, epsilon, true);

      const points: Point[] = [];
      for (let j = 0; j < approxCurve.rows; ++j) {
        const point = approxCurve.data32S.slice(j * 2, j * 2 + 2);
        points.push({ x: point[0], y: point[1] });
      }

      const boundingBox = callbacks.calculateBoundingBox(points);
      const center = callbacks.calculateContourCenter(points);

      newContours.push({
        id: i,
        type: "contour" as const,
        label: ``,
        path: callbacks.pointsToSVGPath(points),
        center,
        boundingBox,
        points,
        price: 3000,
      });

      approxCurve.delete();
    }

    kernel.delete();
    processed.delete();
    return newContours;
  } finally {
    src.delete();
    gray.delete();
    edges.delete();
    hierarchy.delete();
    contoursMat.delete();
  }
};
