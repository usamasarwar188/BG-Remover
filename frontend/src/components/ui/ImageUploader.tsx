import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

interface ImageUploaderProps {
  /**
   * Title for the uploader
   */
  title: string;
  /**
   * Image preview URL
   */
  preview: string | null;
  /**
   * Function to call when image is selected
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * ID for the input element
   */
  inputId: string;
}

/**
 * Image uploader component
 * @param {ImageUploaderProps} props - Component props
 * @returns {JSX.Element} Image uploader component
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  preview,
  onChange,
  inputId,
}) => {
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
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box
          onClick={() => document.getElementById(inputId)?.click()}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            border: "2px dashed",
            borderColor: "primary.light",
            background:
              "linear-gradient(45deg, rgba(37, 99, 235, 0.03), rgba(236, 72, 153, 0.03))",
            borderRadius: 2,
            cursor: "pointer",
            bgcolor: "background.paper",
            height: 400,
            mb: 2,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CloudUploadIcon
                  sx={{
                    fontSize: 48,
                    color: "primary.main",
                    filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))",
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Click to upload an image
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or drag and drop
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onChange}
          style={{ display: "none" }}
        />
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
