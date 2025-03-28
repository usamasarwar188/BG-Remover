from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image, ImageDraw
import io
import os
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists

@app.route('/')
def index():
    return {"status": "Server is running", "message": "Use POST /process-image endpoint for image processing"}

def hex_to_rgba(hex_color, opacity=255):
    # Convert hex color (without #) to RGBA tuple
    rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    return (*rgb, opacity)

def create_gradient(size, start_color, end_color, direction='horizontal'):
    # Create a gradient image
    width, height = size
    image = Image.new('RGBA', size)
    draw = ImageDraw.Draw(image)
    
    # Unpack RGBA values
    start_r, start_g, start_b, start_a = start_color
    end_r, end_g, end_b, end_a = end_color
    
    for i in range(width if direction == 'horizontal' else height):
        # Calculate the ratio for color interpolation
        ratio = i / (width - 1) if direction == 'horizontal' else i / (height - 1)
        
        # Interpolate between start and end colors
        current_r = int(start_r * (1 - ratio) + end_r * ratio)
        current_g = int(start_g * (1 - ratio) + end_g * ratio)
        current_b = int(start_b * (1 - ratio) + end_b * ratio)
        current_a = int(start_a * (1 - ratio) + end_a * ratio)
        
        current_color = (current_r, current_g, current_b, current_a)
        
        if direction == 'horizontal':
            draw.line([(i, 0), (i, height)], fill=current_color)
        else:
            draw.line([(0, i), (width, i)], fill=current_color)
            
    return image

@app.route("/remove-background", methods=["POST"])
@app.route("/remove-bg", methods=["POST"])  # Add alias for frontend compatibility
def remove_background():
    # Get uploaded file
    input_image_file = request.files.get("file")

    if not input_image_file:
        return {"error": "Input image is required"}, 400

    try:
        print("Removing background from image")
        # Open input image and remove background
        input_image = Image.open(input_image_file).convert("RGBA")
        removed_bg_image = remove(input_image)

        # Save the processed image in-memory
        img_io = io.BytesIO()
        removed_bg_image.save(img_io, format="PNG")
        img_io.seek(0)

        print("Background removal complete")
        return send_file(img_io, mimetype="image/png")
    except Exception as e:
        print(f"Error removing background: {str(e)}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True, port=5001) 