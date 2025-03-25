from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists

def hex_to_rgb(hex_color):
    # Convert hex color (without #) to RGB tuple
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

@app.route("/process-image", methods=["POST"])
def process_image():
    # Get uploaded files and parameters
    input_image_file = request.files.get("input_image")
    bg_type = request.form.get("bg_type")

    if not input_image_file:
        return {"error": "Input image is required"}, 400

    try:
        # Open input image and remove background
        input_image = Image.open(input_image_file).convert("RGBA")
        removed_bg_image = remove(input_image)

        if bg_type == "image":
            # Handle image background
            bg_image_file = request.files.get("bg_image")
            if not bg_image_file:
                return {"error": "Background image is required"}, 400

            # Open and resize the background image
            bg_image = Image.open(bg_image_file).convert("RGBA")
            bg_image = bg_image.resize(removed_bg_image.size)
        else:
            # Handle color background
            bg_color = request.form.get("bg_color", "ffffff")  # Default to white
            rgb_color = hex_to_rgb(bg_color)
            
            # Create a solid color background image
            bg_image = Image.new("RGBA", removed_bg_image.size, (*rgb_color, 255))

        # Merge the subject with the new background
        final_image = Image.alpha_composite(bg_image, removed_bg_image)

        # Save the processed image in-memory
        img_io = io.BytesIO()
        final_image.save(img_io, format="PNG")
        img_io.seek(0)

        return send_file(img_io, mimetype="image/png")
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True) 