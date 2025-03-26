/**
 * Converts decimal opacity (0-255) to hex format for use in colors
 * @param {number} opacity - Opacity value (0-255)
 * @returns {string} Hex representation of opacity
 */
export const hexToOpacity = (opacity) => {
  const hex = Math.round(opacity).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

/**
 * Creates object URL from a file
 * @param {File} file - Image file
 * @returns {string|null} Object URL or null if no file
 */
export const createPreviewUrl = (file) => {
  return file ? URL.createObjectURL(file) : null;
};

/**
 * Revokes an object URL to free up memory
 * @param {string} url - Object URL to revoke
 */
export const revokeUrl = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Downloads the content of a canvas as a PNG image
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {string} filename - The name for the downloaded file
 */
export const downloadCanvasImage = (
  canvas,
  filename = "processed-image.png"
) => {
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
