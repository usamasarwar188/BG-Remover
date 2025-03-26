import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { downloadCanvasImage } from "../../utils/imageUtils";

interface ResultDisplayProps {
  /**
   * Reference to the canvas element
   */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /**
   * Reference for scrolling
   */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /**
   * Whether a result is available
   */
  hasResult: boolean;
}

/**
 * Result display component
 * @param {ResultDisplayProps} props - Component props
 * @returns {JSX.Element|null} Result display component or null if no result
 */
const ResultDisplay: React.FC<ResultDisplayProps> = ({
  canvasRef,
  containerRef,
  hasResult,
}) => {
  if (!hasResult) return null;

  return (
    <Card
      elevation={0}
      sx={{
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      }}
      ref={containerRef}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Result
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 400,
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
              border: "2px solid",
              borderColor: "primary.main",
              p: 3,
              mb: 2,
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 4,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => downloadCanvasImage(canvasRef.current)}
            >
              Download Image
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
