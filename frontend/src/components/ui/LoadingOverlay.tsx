import React from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

interface LoadingOverlayProps {
  /**
   * Whether the component is in a loading state
   */
  loading: boolean;
}

/**
 * Loading overlay component
 * @param {LoadingOverlayProps} props - Component props
 * @returns {JSX.Element|null} Loading overlay or null if not loading
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
        backdropFilter: "blur(5px)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="body1">Processing image...</Typography>
      </Paper>
    </Box>
  );
};

export default LoadingOverlay;
