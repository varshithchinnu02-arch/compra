# Compra Layout Agent

## Project Description

An AI-powered layout transformation system that allows users to modify design wireframes using natural language instructions. The system processes user commands in real-time and updates a live preview wireframe, enabling dynamic layout adjustments for product showcase designs.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Google Gemini API Key** (for AI-powered layout transformations)

## Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd layout-agent
```

### 2. Backend Setup

Navigate to the server directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend server:
```bash
node index.js
```

The server will run on `http://localhost:3001`

### 3. Frontend Setup

In a new terminal, navigate to the client directory:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## How to Use

The AI Assistant accepts natural language commands to transform layouts. Here are example prompts to try:

### Layout Transformations
- **"Convert to 9:16"** - Changes the artboard to a mobile aspect ratio (1080×1920)
- **"Convert to 16:9"** - Changes to landscape format (1920×1080)
- **"Convert to 4:5"** - Changes to Instagram format (1080×1350)

### Position Changes
- **"Move headline to top"** - Repositions the headline to the top
- **"Center headline"** - Centers the headline on the canvas
- **"Move product lower"** - Moves the product image down
- **"Center product"** - Centers the product horizontally and vertically
- **"Move product to left"** - Aligns product to the left
- **"Move product to right"** - Aligns product to the right

### Size Adjustments
- **"Make product bigger"** - Increases product size by 20%
- **"Make product huge"** - Scales product up by 50%
- **"Reduce headline"** - Decreases headline size by 20%

### Color Changes
- **"Make background blue"** - Changes background to blue
- **"Make headline red"** - Changes headline text to red
- **"Set background to green"** - Changes background to green
- **"Make headline #FF6B00"** - Use hex colors for precise control

Supported colors: `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `orange`, `cyan`, `teal`, `lime`, `magenta`, `brown`, `gray`, `navy`, `olive`, `maroon`, `silver`, `gold`, `beige`, `indigo`, `lavender`, and hex values like `#FF0000`

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing middleware
- **Google Gemini API** - AI model for layout analysis and transformation
- **dotenv** - Environment variable management

### Layout Processing
- Semantic node detection (headline, product, background)
- Artboard aspect ratio management
- Normalized position and size calculations
- Real-time visual preview rendering

## Project Structure

```
layout-agent/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── components/       # React components
│   │   │   ├── ChatWindow.jsx      # Chat interface
│   │   │   ├── ChatInput.jsx       # Message input
│   │   │   ├── MessageBubble.jsx   # Chat messages
│   │   │   └── WireframePreview.jsx # Layout visualization
│   │   ├── data/
│   │   │   └── initialLayout.json  # Default layout structure
│   │   ├── hooks/
│   │   │   └── useLayoutAgent.js   # Custom React hook
│   │   └── utils/
│   │       └── agent.js            # API communication
│   └── package.json
│
├── server/                    # Express backend
│   ├── index.js              # Server entry point
│   ├── routes/
│   │   └── chat.js           # API routes
│   ├── services/
│   │   ├── layoutTransforms.js     # Layout mutation functions
│   │   └── openaiService.js        # Gemini API integration
│   ├── utils/
│   │   └── jsonValidator.js        # JSON validation
│   ├── .env                  # Environment variables
│   └── package.json
│
└── README.md                 # This file
```

## Features

- ✨ **AI-Powered Layout Transformation** - Natural language processing for design modifications
- 🎨 **Real-Time Preview** - Live rendering of layout changes
- 📐 **Semantic Layout Understanding** - Automatic detection of layout components (headline, product, background)
- 🎯 **Precise Control** - Position, size, and color adjustments
- 💬 **Conversational Interface** - Chat-based interaction with the layout agent

## Development

### Running Tests
```bash
cd server
npm test
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:** Already production-ready with Node.js

## License

MIT

## Support

For issues or questions, please refer to the inline code documentation or open an issue on the repository.
