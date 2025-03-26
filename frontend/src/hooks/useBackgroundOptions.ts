import { useState, useCallback } from "react";
import { BackgroundOptions } from "../types";
import { hexToOpacity } from "../utils/imageUtils";

/**
 * Custom hook for managing background options
 * @returns {BackgroundOptions} Background options and methods
 */
const useBackgroundOptions = (): BackgroundOptions => {
  const [bgType, setBgType] = useState<"image" | "color" | "gradient">("image");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [opacity, setOpacity] = useState<number>(255);
  const [startColor, setStartColor] = useState<string>("#3b82f6");
  const [endColor, setEndColor] = useState<string>("#ec4899");
  const [gradientDirection, setGradientDirection] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  /**
   * Apply background to canvas context
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @param {Function} callback - Callback function after background is drawn
   */
  const applyBackground = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      callback?: () => void
    ): void => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (bgType === "color") {
        // Draw solid color background
        ctx.fillStyle = bgColor + hexToOpacity(opacity);
        ctx.fillRect(0, 0, width, height);
        callback && callback();
      } else if (bgType === "gradient") {
        // Create gradient
        const gradient =
          gradientDirection === "horizontal"
            ? ctx.createLinearGradient(0, 0, width, 0)
            : ctx.createLinearGradient(0, 0, 0, height);

        gradient.addColorStop(0, startColor + hexToOpacity(opacity));
        gradient.addColorStop(1, endColor + hexToOpacity(opacity));

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        callback && callback();
      } else if (bgType === "image" && bgImage) {
        // Draw background image
        const bgImg = new Image();
        bgImg.onload = () => {
          ctx.globalAlpha = opacity / 255;
          ctx.drawImage(bgImg, 0, 0, width, height);
          ctx.globalAlpha = 1;
          callback && callback();
        };
        bgImg.src = URL.createObjectURL(bgImage);
      } else {
        // If no background, still call the callback
        callback && callback();
      }
    },
    [bgType, bgColor, opacity, startColor, endColor, gradientDirection, bgImage]
  );

  /**
   * Handle background image upload
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from file input
   */
  const handleBgImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        setBgImage(file);
        setBgPreview(URL.createObjectURL(file));
      }
    },
    []
  );

  return {
    bgType,
    setBgType,
    bgColor,
    setBgColor,
    opacity,
    setOpacity,
    startColor,
    setStartColor,
    endColor,
    setEndColor,
    gradientDirection,
    setGradientDirection,
    bgImage,
    bgPreview,
    handleBgImageUpload,
    applyBackground,
  };
};

export default useBackgroundOptions;
