/**
 * Type for background options
 */
export interface BackgroundOptions {
  bgType: "image" | "color" | "gradient";
  setBgType: (type: "image" | "color" | "gradient") => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  startColor: string;
  setStartColor: (color: string) => void;
  endColor: string;
  setEndColor: (color: string) => void;
  gradientDirection: "horizontal" | "vertical";
  setGradientDirection: (direction: "horizontal" | "vertical") => void;
  bgImage: File | null;
  bgPreview: string | null;
  handleBgImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyBackground: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    callback?: () => void
  ) => void;
}

/**
 * Type for image processor
 */
export interface ImageProcessor {
  inputImage: File | null;
  inputPreview: string | null;
  processedImage: string | null;
  loading: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  resultRef: React.RefObject<HTMLDivElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateCanvas: (img: HTMLImageElement) => void;
}
