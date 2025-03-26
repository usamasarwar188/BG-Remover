import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { createPreviewUrl, revokeUrl } from "../utils/imageUtils";
import { BackgroundOptions, ImageProcessor } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

/**
 * Custom hook for image processing
 * @param {BackgroundOptions} backgroundOptions - Background options from useBackgroundOptions
 * @returns {ImageProcessor} Image processing state and methods
 */
const useImageProcessor = (
  backgroundOptions: BackgroundOptions
): ImageProcessor => {
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [inputPreview, setInputPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { applyBackground } = backgroundOptions;

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (inputPreview) revokeUrl(inputPreview);
      if (processedImage) revokeUrl(processedImage);
    };
  }, [inputPreview, processedImage]);

  /**
   * Draw the processed image on canvas with the selected background
   * @param {HTMLImageElement} img - The processed image
   */
  const updateCanvas = useCallback(
    (img: HTMLImageElement): void => {
      const canvas = canvasRef.current;
      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply background and then draw image on top
      applyBackground(ctx, canvas.width, canvas.height, () => {
        ctx.drawImage(img, 0, 0);
      });
    },
    [applyBackground]
  );

  /**
   * Handle image upload and remove background
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from file input
   */
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Update state with new image
      setInputImage(file);
      const preview = createPreviewUrl(file);
      setInputPreview(preview);

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`${API_URL}/remove-bg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        });

        // Clean up previous processed image if exists
        if (processedImage) {
          revokeUrl(processedImage);
        }

        const imageUrl = URL.createObjectURL(response.data);
        setProcessedImage(imageUrl);

        // Create an image and draw it on the canvas when it loads
        const img = new Image();
        img.onload = () => {
          updateCanvas(img);
          setLoading(false);

          // Scroll to result after a short delay
          setTimeout(() => {
            if (resultRef.current) {
              resultRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        };
        img.src = imageUrl;
      } catch (error) {
        console.error("Error removing background:", error);
        setLoading(false);
      }
    },
    [processedImage, updateCanvas]
  );

  return {
    inputImage,
    inputPreview,
    processedImage,
    loading,
    canvasRef,
    resultRef,
    handleImageUpload,
    updateCanvas,
  };
};

export default useImageProcessor;
