# 🎨 Background Remover & Replacer

A web application that allows users to remove backgrounds from images and replace them with new backgrounds using AI. Built with Flask and React.

## ✨ Features

- Upload images through a modern, user-friendly interface
- AI-powered background removal using `rembg`
- Replace removed backgrounds with new images
- Preview images before and after processing
- Download processed images

## 🛠️ Tech Stack

- **Backend:** Flask + rembg
- **Frontend:** React
- **Libraries:**
  - Backend: `flask`, `flask-cors`, `rembg`, `pillow`
  - Frontend: `react`, `axios`

## 🚀 Getting Started

### Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BG-Remover
```

2. Set up the backend:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend server will start at `http://127.0.0.1:5000`

3. Set up the frontend:

```bash
cd frontend
npm install
npm start
```

The frontend development server will start at `http://localhost:3000`

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click on the first upload area to select your main image
3. Click on the second upload area to select your background image
4. Click "Process Image" to remove the background and replace it
5. Once processing is complete, you can preview and download the result

## 📝 Notes

- The backend uses the `rembg` library which uses AI to remove backgrounds
- Both the main image and background image must be provided before processing
- Supported image formats: PNG, JPEG, WebP
- For best results, use images with clear subjects and contrasting backgrounds

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
