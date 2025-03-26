import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";

import AppHeader from "../components/ui/AppHeader";
import ImageUploader from "../components/ui/ImageUploader";
import ResultDisplay from "../components/ui/ResultDisplay";
import BackgroundOptions from "../components/ui/BackgroundOptions";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import useBackgroundOptions from "../hooks/useBackgroundOptions";
import useImageProcessor from "../hooks/useImageProcessor";

/**
 * Home page component
 * @returns {JSX.Element} Home page
 */
const HomePage: React.FC = () => {
  // Initialize hooks
  const backgroundOptions = useBackgroundOptions();
  const {
    inputPreview,
    processedImage,
    loading,
    canvasRef,
    resultRef,
    handleImageUpload,
    updateCanvas,
  } = useImageProcessor(backgroundOptions);

  // Update canvas when background parameters change
  useEffect(() => {
    if (processedImage) {
      const img = new Image();
      img.onload = () => updateCanvas(img);
      img.src = processedImage;
    }
  }, [
    backgroundOptions.bgType,
    backgroundOptions.bgColor,
    backgroundOptions.opacity,
    backgroundOptions.startColor,
    backgroundOptions.endColor,
    backgroundOptions.gradientDirection,
    backgroundOptions.bgImage,
    processedImage,
    updateCanvas,
  ]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppHeader />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "5fr 4fr" },
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              height: "fit-content",
            }}
          >
            <ImageUploader
              title="Upload Image"
              preview={inputPreview}
              onChange={handleImageUpload}
              inputId="input-image"
            />

            <ResultDisplay
              canvasRef={canvasRef}
              containerRef={resultRef}
              hasResult={!!processedImage}
            />
          </Box>

          <BackgroundOptions options={backgroundOptions} />
        </Box>

        <LoadingOverlay loading={loading} />
      </Container>
    </Box>
  );
};

export default HomePage;
