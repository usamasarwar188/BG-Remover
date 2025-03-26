import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Image as ImageIcon,
  Palette as PaletteIcon,
  Gradient as GradientIcon,
  CloudUpload as CloudUploadIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { BackgroundOptions as BackgroundOptionsType } from "../../types";

interface BackgroundOptionsProps {
  /**
   * Background options object from useBackgroundOptions hook
   */
  options: BackgroundOptionsType;
}

/**
 * Background options component
 * @param {BackgroundOptionsProps} props - Component props
 * @returns {JSX.Element} Background options component
 */
const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({ options }) => {
  const {
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
    bgPreview,
    handleBgImageUpload,
  } = options;

  return (
    <Card
      elevation={0}
      sx={{
        height: "fit-content",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Background Options</Typography>
          <Tooltip
            title="Choose a background type and customize its appearance"
            placement="top"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <InfoIcon sx={{ ml: 1, fontSize: 18, color: "text.secondary" }} />
          </Tooltip>
        </Box>

        <Stack
          spacing={3}
          sx={{
            maxHeight: { lg: "calc(100vh - 180px)" },
            overflow: "hidden",
            pr: 1,
            "::-webkit-scrollbar": {
              width: "8px",
            },
            "::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#cbd5e1",
              borderRadius: "4px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#94a3b8",
            },
          }}
        >
          <ToggleButtonGroup
            value={bgType}
            exclusive
            onChange={(e, newValue) =>
              newValue && setBgType(newValue as "image" | "color" | "gradient")
            }
            fullWidth
            sx={{ mb: 1 }}
          >
            <ToggleButton value="image">
              <ImageIcon sx={{ mr: 1 }} />
              Image
            </ToggleButton>
            <ToggleButton value="color">
              <PaletteIcon sx={{ mr: 1 }} />
              Color
            </ToggleButton>
            <ToggleButton value="gradient">
              <GradientIcon sx={{ mr: 1 }} />
              Gradient
            </ToggleButton>
          </ToggleButtonGroup>

          <Box>
            <Typography
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              Opacity: {Math.round((opacity / 255) * 100)}%
            </Typography>
            <Slider
              value={opacity}
              min={0}
              max={255}
              onChange={(e, newValue) => setOpacity(newValue as number)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) =>
                `${Math.round((value / 255) * 100)}%`
              }
              sx={{
                "& .MuiSlider-thumb": {
                  width: 14,
                  height: 14,
                },
              }}
            />
          </Box>

          <Divider />

          {bgType === "image" ? (
            <Box
              sx={{
                p: 2,
                border: "2px dashed",
                borderColor: "primary.light",
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: "background.paper",
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              onClick={() => document.getElementById("bg-image")?.click()}
            >
              {bgPreview ? (
                <img
                  src={bgPreview}
                  alt="Background preview"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <CloudUploadIcon
                    sx={{ fontSize: 32, color: "primary.main" }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Click to upload background image
                  </Typography>
                </Box>
              )}
              <input
                id="bg-image"
                type="file"
                accept="image/*"
                onChange={handleBgImageUpload}
                style={{ display: "none" }}
              />
            </Box>
          ) : bgType === "gradient" ? (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>Start Color:</Typography>
                <input
                  type="color"
                  value={startColor}
                  onChange={(e) => setStartColor(e.target.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {startColor}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>End Color:</Typography>
                <input
                  type="color"
                  value={endColor}
                  onChange={(e) => setEndColor(e.target.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "7px",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {endColor}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>Direction:</Typography>
                <ToggleButtonGroup
                  value={gradientDirection}
                  exclusive
                  onChange={(e, newValue) =>
                    newValue &&
                    setGradientDirection(newValue as "horizontal" | "vertical")
                  }
                  size="small"
                >
                  <ToggleButton value="horizontal">Horizontal</ToggleButton>
                  <ToggleButton value="vertical">Vertical</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography>Color:</Typography>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {bgColor}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BackgroundOptions;
