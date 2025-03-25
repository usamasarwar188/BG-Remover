import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputImage, setInputImage] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgType, setBgType] = useState("image"); // "image" or "color"
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputPreview, setInputPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const resultRef = useRef(null);

  const handleImageUpload = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!inputImage || (bgType === "image" && !bgImage)) {
      alert("Please upload required images!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("input_image", inputImage);
    formData.append("bg_type", bgType);

    if (bgType === "image") {
      formData.append("bg_image", bgImage);
    } else {
      formData.append("bg_color", bgColor.replace("#", ""));
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-image",
        formData,
        {
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Background Remover & Replacer</h1>
        <p>
          Upload an image, remove its background, and replace it with a new
          background or color!
        </p>
      </header>

      <main className="app-main">
        <div className="upload-section">
          <div className="upload-container">
            <h3>1. Upload Main Image</h3>
            <div
              className="image-preview"
              onClick={() => document.getElementById("input-image").click()}
            >
              {inputPreview ? (
                <img src={inputPreview} alt="Input preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>Click to upload</span>
                </div>
              )}
            </div>
            <input
              id="input-image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e, setInputImage, setInputPreview)
              }
              style={{ display: "none" }}
            />
          </div>

          <div className="upload-container">
            <h3>2. Choose Background</h3>
            <div className="background-type-selector">
              <button
                className={`type-button ${bgType === "image" ? "active" : ""}`}
                onClick={() => setBgType("image")}
              >
                Image
              </button>
              <button
                className={`type-button ${bgType === "color" ? "active" : ""}`}
                onClick={() => setBgType("color")}
              >
                Color
              </button>
            </div>

            {bgType === "image" ? (
              <>
                <div
                  className="image-preview"
                  onClick={() => document.getElementById("bg-image").click()}
                >
                  {bgPreview ? (
                    <img src={bgPreview} alt="Background preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span>Click to upload background image</span>
                    </div>
                  )}
                </div>
                <input
                  id="bg-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, setBgImage, setBgPreview)
                  }
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <div className="color-picker-container">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="color-picker"
                />
                <span className="color-value">{bgColor}</span>
              </div>
            )}
          </div>
        </div>

        <button
          className="process-button"
          onClick={handleSubmit}
          disabled={!inputImage || (bgType === "image" && !bgImage) || loading}
        >
          {loading ? "Processing..." : "3. Process Image"}
        </button>

        {processedImage && (
          <div className="result-section" ref={resultRef}>
            <h3>4. Result</h3>
            <div className="result-image">
              <img src={processedImage} alt="Processed" />
            </div>
            <a
              href={processedImage}
              download="processed-image.png"
              className="download-button"
            >
              Download Image
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
